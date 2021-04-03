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
    Card,
    Textarea,
    Input,
    Radio,
    RangeSlider,
    Text,
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
            playtime: [12,16],
            about: '',
            age: '',
            discord: '',
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
                    about: data.result[0].description,
                    age: data.result[0].age,
                    discord: discord,
                    micro: data.result[0].microphone,
                    spinner: false,
                });
                if (data.result[0].time1 !== null && data.result[0].time2 !== null) {
                    this.setState({playtime: [data.result[0].time1, data.result[0].time2]});
                }
            }
        })
    }

    submitForm() {
        if (this.state.about !== undefined && this.state.age !== undefined) {
            if (this.state.about.trim() === '' || this.state.age.trim() === '') {
                this.setState({
                    snackbar: <Snackbar
                        layout='vertical'
                        onClose={() => this.setState({snackbar: null})}>
                        Поля не должны быть пустыми
                    </Snackbar>
                });
            } else {
                fetch2('teammates.setSettings', 'type=main&about=' + encodeURI(this.state.about.trim()) + '&microphone=' + encodeURI(this.state.micro) + '&age=' + encodeURI(this.state.age.trim()) + '&time1=' + encodeURI(this.state.playtime[0]) + '&time2=' + encodeURI(this.state.playtime[1]) + '&discord=' + encodeURI(this.state.discord.replace(/#/g, '-').trim())).then(data => {
                    if (data.result === 'ok') {
                        this.props.setActiveModal('settingsSaved');
                        bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
                    } else if (data.result === 'cooldown') {
                        this.setState({
                            snackbar: <Snackbar
                                layout='vertical'
                                duration="3000"
                                className="noMarginSnackbar"
                                onClose={() => this.setState({snackbar: null})}>
                                Эй, не так быстро! Обновлять информацию о профиле можно раз в 5 сек.
                            </Snackbar>
                        });
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

                        <Div>
                            <Card>
                                <Div>
                                    <Text weight="regular">Если у тебя закрыты личные сообщения, то открой их, пожалуйста. В ином случае другие пользователи сервиса не смогут тебе написать.</Text>
                                </Div>
                            </Card>
                        </Div>

                        <FormItem top="Расскажи о себе">
                            <Textarea
                                placeholder="я побитый жизнью мёрсимейнер... играю на золоте и сливаю всем катки..."
                                required maxLength={150} name="about" value={this.state.about}
                                onChange={(e) => {
                                    this.setState({about: e.target.value.replace(/[@+#+*+?+&++]/gi, "")})
                                }}/>
                        </FormItem>

                        <FormItem top="У тебя есть микрофон?">
                            <Radio name="micro" value="1" checked={this.state.micro == 1} onChange={() => {
                                this.setState({micro: 1})
                            }} required>Да, есть</Radio>
                            <Radio name="micro" value="0" checked={this.state.micro == 0} onChange={() => {
                                this.setState({micro: 0})
                            }} required>Пока нет</Radio>
                        </FormItem>

                        <FormItem top="Твой Discord-тег?">
                            <Input placeholder="Допустим, Lukas#1575" name="discord" maxLength={30}
                                   value={this.state.discord} onChange={(e) => {
                                this.setState({discord: e.target.value})
                            }}/>
                        </FormItem>

                        <FormItem top="Твой возраст?">
                            <Input type="tel" name="age" value={this.state.age}
                                   placeholder="Я ощущаю себя на 39, хотя мне 13!" required maxLength={2}
                                   onChange={(e) => {
                                       if (e.target.value.replace(/\D/g, "").substr(0, 1) == 0) {
                                            this.setState({age: ''})
                                       } else {
                                        this.setState({age: e.target.value.replace(/\D/g, "")})
                                       }
                                   }}/>
                        </FormItem>

                        <FormItem top="В какое время ты играешь?">
                           <RangeSlider
                                min={0}
                                max={24}
                                step={1}
                                required
                                onChange={(e) => {this.setState({playtime: e})}}
                                value={this.state.playtime}
                                name="playtime"
                            />
                            <Input type="text" name="playtime"
                                   disabled
                                   style={{marginTop: 10}}
                                   value={"Я играю с " + this.state.playtime[0] + ":00 до " + this.state.playtime[1] + ":00 по МСК"}
                            />
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