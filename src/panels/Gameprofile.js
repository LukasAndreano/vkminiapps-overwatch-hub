import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import queryString from 'query-string'
import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Group,
    Button,
    SimpleCell,
    Div,
    Title,
    Text,
    MiniInfoCell,
    Card,
    Snackbar,
    ScreenSpinner,
    Avatar,
} from '@vkontakte/vkui';

import {
    Icon24FavoriteOutline,
    Icon24CupOutline,
    Icon24RecentOutline,
    Icon24GameOutline,
    Icon24LockOutline,
    Icon24ErrorCircleOutline,
    Icon24ThumbsUpOutline
} from '@vkontakte/icons';

import fetch2 from '../components/Fetch';
import OverwatchDailyArcadeIcon from '../img/ow_arcade.jpg';

class Gameprofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbar: null,
            battletag: null,
            profileinfo: null,
            request: false,
            allow_messages_request: false,
            spinner: true,
        }
        this.connect = this.connect.bind(this);
    }

    componentDidMount() {
        try {
            fetch2('db.GetGameProfile').then(data => {
                if (data.result !== null) {
                    this.setState({battletag: data.result});
                    try {
                        fetch('https://owapi.io/profile/pc/eu/' + data.result.replace('#', '-'))
                            .then(response => response.json())
                            .then(data => {
                                this.setState({profileinfo: data, spinner: false});
                            });
                    } catch (err) {
                        this.setState({
                            snackbar: <Snackbar
                                className="noMarginSnackbar"
                                layout='vertical'
                                onClose={() => this.setState({snackbar: null})}>
                                Не удалось загрузить информацию по профилю
                            </Snackbar>
                        })
                    }
                } else {
                    this.setState({battletag: data.result, spinner: false});
                }
            });
        } catch (err) {
            this.setState({
                snackbar: <Snackbar
                    layout='vertical'
                    className="noMarginSnackbar"
                    onClose={() => this.setState({snackbar: null})}
                    before={<Avatar src={OverwatchDailyArcadeIcon} size={32}/>}>
                    Не удалось загрузить информацию
                </Snackbar>
            })
        }
    }

    componentWillUnmount() {
        this.setState({
            profileinfo: null,
            snackbar: null,
            spinner: false,
            battletag: null,
            request: false,
            allow_messages_request: false
        });
    }

    connect() {
        if (this.state.request === false && this.state.allow_messages_request === false) {
            this.setState({allow_messages_request: true});
            let getParams = queryString.parse(window.location.search);
            {
                getParams.vk_user_id == this.props.user.id &&
                bridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": 197332265})
                    .then(() => {
                        try {
                            fetch2('connectaccount').then(data => {
                                if (data.result === 'ok') {
                                    this.props.tapticEngine();
                                    this.setState({
                                        request: true, snackbar:
                                            <Snackbar
                                                className="noMarginSnackbar"
                                                onClose={() => this.setState({snackbar: null})}>
                                                Мы отправили тебе сообщение с ссылкой. Проверь личку, пожалуйста.
                                            </Snackbar>
                                    });
                                } else {
                                    this.setState({
                                        snackbar: <Snackbar
                                            className="noMarginSnackbar"
                                            layout='vertical'
                                            onClose={() => this.setState({snackbar: null})}>
                                            Мы уже отправляли тебе сообщение. Проверь личку.
                                        </Snackbar>
                                    })
                                }
                            })
                        } catch (err) {
                            this.setState({
                                snackbar: <Snackbar
                                    className="noMarginSnackbar"
                                    layout='vertical'
                                    onClose={() => this.setState({snackbar: null})}>
                                    Не удалось отправить сообщение
                                </Snackbar>
                            })
                        }
                    })
                    .catch(() => {
                        this.props.tapticEngine('error')
                        this.setState({
                            allow_messages_request: true, snackbar:
                                <Snackbar
                                    className="noMarginSnackbar"
                                    onClose={() => this.setState({snackbar: null})}
                                    before={<Avatar src={OverwatchDailyArcadeIcon} size={32}/>}
                                >
                                    Привязка профиля отменена
                                </Snackbar>
                        });
                    });
            }
            setTimeout(() => {
                this.setState({allow_messages_request: false})
            }, 4000);
        }
        if (this.state.request === true) {
            this.setState({
                snackbar: <Snackbar
                    className="noMarginSnackbar"
                    layout='vertical'
                    onClose={() => this.setState({snackbar: null})}
                    before={<Avatar src={OverwatchDailyArcadeIcon} size={32}/>}>
                    Сообщение с ссылкой для привязки профиля уже отправлено.
                </Snackbar>
            })
        }
        if (this.state.allow_messages_request === true) {
            this.setState({
                snackbar: <Snackbar
                    className="noMarginSnackbar"
                    layout='vertical'
                    onClose={() => this.setState({snackbar: null})}
                    before={<Avatar src={OverwatchDailyArcadeIcon} size={32}/>}>
                    Попробуйте повторить запрос чуть позже...
                </Snackbar>
            })
        }
    }

    render() {
        let {id, go} = this.props;
        return (
            <Panel id={id}>
                <PanelHeader separator={false} left={<PanelHeaderBack onClick={() => go('home')} />}>Игровой
                    профиль</PanelHeader>
                {this.state.spinner === true && <ScreenSpinner size='large'/>}
                {this.state.spinner === false &&
                <Div>
                    <Card>
                        <Div>
                            <Title level="2" weight="heavy" style={{marginBottom: 10}}>Как работает этот раздел?</Title>
                            <Text weight="regular">В этом резделе отображается вся доступная нам информация по твоему
                                игровому профилю (ТОЛЬКО PC и регион EUROPE). Обрати внимание, что у тебя должен быть создан BattleTag и игровой профиль
                                должен быть открыт (это можно сделать в настройках игры). Информация по профилю
                                обновляется в течение 30 минут.</Text>
                        </Div>
                    </Card>
                    {this.state.battletag === null &&
                    <div>
                        <Card>
                            <SimpleCell
                                style={{padding: 10, borderRadius: 10, marginTop: 10}}
                                before={this.props.user.photo_200 ? <Avatar src={this.props.user.photo_200}/> : null}
                                description="Игровой профиль не привязан"
                                disabled
                            >{`${this.props.user.first_name} ${this.props.user.last_name}`}</SimpleCell>
                        </Card>
                        <Button style={{marginTop: 10}} onClick={this.connect} size="l" stretched mode="secondary">Привязать
                            профиль</Button>
                    </div>
                    }
                    {this.state.battletag !== null &&
                    <div>
                        {this.state.profileinfo.private === true &&
                        <div>
                            <Card>
                                <SimpleCell
                                    style={{padding: 10, borderRadius: 10, marginTop: 10}}
                                    before={<Avatar src={this.state.profileinfo.portrait}/>}
                                    description={this.state.battletag}
                                    disabled
                                >
                                    {`${this.props.user.first_name} ${this.props.user.last_name}`}
                                </SimpleCell>
                            </Card>
                            <Card>
                                <MiniInfoCell before={<Icon24LockOutline/>} textWrap="full" style={{marginTop: 10}}>
                                    Твой игровой профиль закрыт
                                </MiniInfoCell>
                            </Card>
                            <Card>
                                <MiniInfoCell textWrap="full" style={{marginTop: 10}}>
                                    Открыть профиль можно в настройках - общение - отображение профиля (поставить:
                                    открытый)
                                </MiniInfoCell>
                            </Card>
                        </div>
                        }
                        {this.state.profileinfo.private === false && this.state.profileinfo.username !== '' &&
                        <div>
                            <Card>
                                <SimpleCell
                                    style={{padding: 10, borderRadius: 10, marginTop: 10}}
                                    before={<Avatar src={this.state.profileinfo.portrait}/>}
                                    description={this.state.battletag}
                                    disabled
                                >
                                    {`${this.props.user.first_name} ${this.props.user.last_name}`}
                                </SimpleCell>
                            </Card>
                            <Card style={{marginTop: 10}}>
                                <Group>
                                    <MiniInfoCell before={<Icon24FavoriteOutline/>}>
                                        Игровой лвл: {this.state.profileinfo.level}
                                    </MiniInfoCell>
                                    <MiniInfoCell before={<Icon24CupOutline/>}>
                                        Соревновательная игра: <br/> Хил
                                        - {this.state.profileinfo.competitive.support.rank ? this.state.profileinfo.competitive.support.rank : 'пройди калибровку'}
                                        <br/> Урон
                                        - {this.state.profileinfo.competitive.damage.rank ? this.state.profileinfo.competitive.damage.rank : 'пройди калибровку'}
                                        <br/> Танк
                                        - {this.state.profileinfo.competitive.tank.rank ? this.state.profileinfo.competitive.tank.rank : 'пройди калибровку'}
                                    </MiniInfoCell>
                                    <MiniInfoCell before={<Icon24RecentOutline/>} textWrap="full">
                                        Наиграно часов в режиме (формат: ЧАСЫ:МИН:СЕК): <br/>Быстрая игра
                                        - {this.state.profileinfo.playtime.quickplay ? this.state.profileinfo.playtime.quickplay : '0'}
                                        <br/>Ранкед (этот сезон)
                                        - {this.state.profileinfo.playtime.competitive ? this.state.profileinfo.playtime.competitive : '0'}
                                    </MiniInfoCell>
                                </Group>
                            </Card>
                            <Card style={{marginTop: 10}}>
                                <Group>
                                    <MiniInfoCell before={<Icon24ThumbsUpOutline/>} textWrap="full">
                                        Уровень репутации: {this.state.profileinfo.endorsement.frame.substr(-1)}.
                                        <br/> Тебя хвалили за: <br/>
                                        Инициативность: {this.state.profileinfo.endorsement.shotcaller.rate} шт<br/>
                                        Помощь союзникам: {this.state.profileinfo.endorsement.teammate.rate} шт<br/>
                                        Спортивный дух: {this.state.profileinfo.endorsement.sportsmanship.rate} шт
                                    </MiniInfoCell>
                                </Group>
                            </Card>
                            <Card style={{marginTop: 10}}>
                                <Group>
                                    <MiniInfoCell before={<Icon24GameOutline/>}>
                                        Побед в быстрой
                                        игре: {this.state.profileinfo.games.quickplay.won ? this.state.profileinfo.games.quickplay.won : '0'}<br/>Поражений
                                        в быстрой
                                        игре: {this.state.profileinfo.games.quickplay.played - this.state.profileinfo.games.quickplay.won ? this.state.profileinfo.games.quickplay.played - this.state.profileinfo.games.quickplay.won : '0'}<br/>Матчей
                                        всего: {this.state.profileinfo.games.quickplay.played ? this.state.profileinfo.games.quickplay.played : '0'}
                                        <br/><br/>Побед в ранкеде (этот
                                        сезон): {this.state.profileinfo.games.competitive.won ? this.state.profileinfo.games.competitive.won : '0'}<br/>Поражений
                                        в ранкеде (этот
                                        сезон): {this.state.profileinfo.games.competitive.played - this.state.profileinfo.games.competitive.won ? this.state.profileinfo.games.competitive.played - this.state.profileinfo.games.competitive.won : '0'}<br/> Матчей
                                        типа 'ничья' (этот
                                        сезон): {this.state.profileinfo.games.competitive.draw ? this.state.profileinfo.games.competitive.draw : '0'}
                                        <br/>Матчей всего (этот
                                        сезон): {this.state.profileinfo.games.competitive.played ? this.state.profileinfo.games.competitive.played : '0'}
                                    </MiniInfoCell>
                                </Group>
                            </Card>
                        </div>
                        }
                        {this.state.profileinfo.message === 'Error: Profile not found' &&
                        <div>
                            <Card>
                                <MiniInfoCell before={<Icon24ErrorCircleOutline/>} textWrap="full"
                                              style={{marginTop: 10}}>
                                    Нам не удалось найти твой профиль в Overwatch. Возможно, у тебя нулевой аккаунт?
                                </MiniInfoCell>
                            </Card>
                        </div>
                        }
                        {this.state.profileinfo.username === '' &&
                        <div>
                            <Card>
                                <MiniInfoCell before={<Icon24ErrorCircleOutline/>} textWrap="full"
                                              style={{marginTop: 10}}>
                                    Мы не получили ответа от сервера Blizzard. Попробуйте позже, пожалуйста.
                                </MiniInfoCell>
                            </Card>
                        </div>
                        }
                        <Button style={{marginTop: 10}} onClick={this.connect} size="l" stretched mode="secondary">Перепривязать
                            профиль</Button>
                    </div>
                    }
                </Div>
                }
                {this.state.snackbar}
            </Panel>
        )
    }
}

export default Gameprofile;