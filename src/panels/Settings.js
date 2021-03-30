import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import fetch2 from '../components/Fetch';
import {
    Panel,
    Div,
    Button,
    PanelHeader,
    PanelHeaderBack,
    FormLayout,
    FormItem,
    Textarea,
    Input,
    Radio,
    Snackbar,
    ScreenSpinner,
} from '@vkontakte/vkui';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbar: null,
            spinner: true,
            micro: null,
            form: {
                about: '',
                age: '',
                playtime: '',
                discord: '',
            },
        };
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        fetch2('teammates.getProfile').then(data => {
            if (data.result !== 'created') {
                let discord = data.result[0].discord;
                if (discord !== null)
                    discord = data.result[0].discord.replace(/-/g, '#');
                this.setState({
                    form: {
                        about: data.result[0].description,
                        age: data.result[0].age,
                        playtime: data.result[0].playtime,
                        discord: discord
                    },
                    micro: data.result[0].microphone,
                    spinner: false,
                });
            }
        })
    }

    submitForm(event) {
        if (event.target.about.value.trim() === '' || event.target.age.value.trim() === '' || event.target.playtime.value.trim() === '') {
            this.setState({
                snackbar: <Snackbar
                    layout='vertical'
                    onClose={() => this.setState({snackbar: null})}>
                    Поля не должны быть пустыми
                </Snackbar>
            });
        } else {
            fetch2('teammates.setSettings', 'type=main&about=' + encodeURI(event.target.about.value.trim()) + '&microphone=' + encodeURI(event.target.micro.value) + '&age=' + encodeURI(event.target.age.value.trim()) + '&playtime=' + encodeURI(event.target.playtime.value.trim()) + '&discord=' + encodeURI(event.target.discord.value.replace(/#/g, '-').trim())).then(data => {
                if (data.result === 'ok') {
                    this.props.setActiveModal('settingsSaved');
                    bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
                } else {
                    this.setState({
                        snackbar: <Snackbar
                            layout='vertical'
                            onClose={() => this.setState({snackbar: null})}>
                            Упс, что-то пошло не так...
                        </Snackbar>
                    });
                    bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"});
                }
            })
        }
    }

    render() {
        let {id, go} = this.props;
        return (
            <Panel id={id}>
                <PanelHeader separator={false} left={<PanelHeaderBack onClick={() => go('findteammate')}/>}>
                    Настройки
                </PanelHeader>
                {this.state.spinner === true && <ScreenSpinner size='large'/>}
                {this.state.spinner === false &&
                <Div>
                    <FormLayout onSubmit={(e) => {
                        e.preventDefault();
                        this.submitForm(e);
                    }} style={{textAlign: 'left'}}>

                        <FormItem top="Расскажи о себе">
                            <Textarea
                                placeholder="я побитый жизнью мёрсимейнер... играю на золоте и сливаю всем катки..."
                                required maxLength={200} name="about" value={this.state.form.about}
                                onChange={(e) => {
                                    this.setState({form: {about: e.target.value.replace(/[@+#+*+?+&++]/gi, "")}})
                                }}/>
                        </FormItem>

                        <FormItem top="У тебя есть микрофон?">
                            <Radio name="micro" value="1" checked={this.state.micro == 1} onChange={() => {
                                this.setState({micro: 1})
                            }} required>Да, есть</Radio>
                            <Radio name="micro" value="0" checked={this.state.micro == 0} onChange={() => {
                                this.setState({micro: 0})
                            }} required>Нет, нету</Radio>
                        </FormItem>

                        <FormItem top="Твой Discord-тег?">
                            <Input placeholder="Допустим, Lukas#1575" name="discord" maxLength={30}
                                   value={this.state.form.discord} onChange={(e) => {
                                this.setState({form: {discord: e.target.value}})
                            }}/>
                        </FormItem>

                        <FormItem top="Твой возраст?">
                            <Input type="text" name="age" value={this.state.form.age}
                                   placeholder="Я ощущаю себя на 39, хотя мне 13!" required maxLength={2}
                                   onChange={(e) => {
                                       this.setState({form: {age: e.target.value.replace(/\D/g, "")}})
                                   }}/>
                        </FormItem>

                        <FormItem top="В какое время ты играешь?">
                            <Input type="text" name="playtime" value={this.state.form.playtime}
                                   placeholder="Обычно я играю с 9 до 11 вечера по МСК" required maxLength={50}
                                   onChange={(e) => {
                                       this.setState({form: {playtime: e.target.value.replace(/[@+#+*+?+&++]/gi, "")}})
                                   }}/>
                        </FormItem>

                        <FormItem>
                            <Button size="l" type="primary" stretched mode="secondary">Сохранить</Button>
                        </FormItem>
                    </FormLayout>
                </Div>
                }
                {this.state.snackbar}
            </Panel>
        )
    }
}

export default Settings;