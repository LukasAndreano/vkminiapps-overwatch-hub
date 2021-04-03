import React from 'react'
import bridge from '@vkontakte/vk-bridge'
import fetch2 from '../components/Fetch'
import {
    Avatar,
    Group,
    Header,
    PanelHeader,
    PanelHeaderBack,
    Panel,
    SimpleCell,
    Switch,
    Card,
    Div,
    ContentCard,
    MiniInfoCell,
    Tabbar,
    TabbarItem,
    PullToRefresh,
    Epic,
    ScreenSpinner,
} from '@vkontakte/vkui'
import {
    Icon28NewsfeedOutline,
    Icon20ArticleOutline,
    Icon28ArticleOutline,
    Icon12Verified,
    Icon20UserCircleOutline,
    Icon28Profile,
    Icon20CheckCircleOutline,
    Icon28UserSquareOutline,
    Icon28ChevronRightOutline,
    Icon28EditOutline,
    Icon28GhostOutline,
} from '@vkontakte/icons'

class FindTeammate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStory: 'feed',
            spinner: true,
            display: false,
            profileTag: false,
            wall: null,
            profile: null,
            fetching: false,
            switches: {
                displayInSearch: null,
                profileTag: null,
            },
        }
        this.openPage = this.openPage.bind(this)
        this.Switch = this.Switch.bind(this)
        this.onRefresh = this.onRefresh.bind(this)
    }

    onRefresh() {
        this.setState({ fetching: true });

        fetch2('teammates.getWall').then(data => {
            let wall = []
            data.result.map(el => {
                let tag = "Профиль скрыт или отсутствует"
                let verified = ""
                if (el.tag != false && el.battletag !== undefined && el.battletag !== null)
                    tag = el.battletag
                if (el.verified != false)
                    verified = <Icon12Verified fill="#4cad64"/>
                    wall.push(
                    <Card className="tap" key={el.id} style={{paddingBottom: 5, marginBottom: 10}} onClick={() => {
                    this.props.setActiveModal('profile', {
                        avatar: el.avatar,
                        user_id: el.user_id,
                        name: el.name,
                        text: el.description,
                        battletag: el.battletag,
                        tag: tag,
                        verified: verified,
                        discord: el.discord,
                        age: el.age,
                        time1: el.time1,
                        time2: el.time2,
                        microphone: el.microphone,
                    })
                }}>
            <SimpleCell disabled description={tag}
                after={<Icon28ChevronRightOutline/>}
                badge={verified} before={<Avatar size={40}
                src={el.avatar}/>}>{el.name}</SimpleCell>
                <MiniInfoCell
                before={<Icon20ArticleOutline/>}
                textWrap="full"
                textLevel="primary"
                    >
                    {el.description}
                    </MiniInfoCell>
                    <MiniInfoCell
                before={<Icon20UserCircleOutline/>}
                textWrap="full"
                textLevel="primary"
                    >
                    {el.battletag ? "К профилю привязан игровой аккаунт" : "К профилю не привязан игровой аккаунт"}
                    </MiniInfoCell>
                {el.verified == 1 &&
                <MiniInfoCell
                    before={<Icon20CheckCircleOutline fill="#4cad64"/>}
                    textWrap="full"
                    textLevel="primary"
                        >
                        Разработчик или партнёр сервиса
                </MiniInfoCell>
                }
            </Card>
            )
            })
            setTimeout(() => {
                this.setState({wall: wall, fetching: false})
            }, 300)
        })
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.props.tab === 'profile') {
                this.setState({activeStory: "profile"})
            }
        }, 600);
        fetch2('teammates.getProfile').then(data => {
            if (data.result === 'created')
                this.props.setActiveModal('start1')
            this.setState({profile: data.result})
            if (data.result[0].display == true) {
                this.setState({
                    display: true,
                    switches: {
                        displayInSearch: <Switch onChange={() => {
                            this.props.clickOnLink()
                            this.Switch('display')
                        }} defaultChecked/>
                    }
                })
            } else {
                this.setState({
                    switches: {
                        displayInSearch: <Switch onChange={() => {
                            this.props.clickOnLink()
                            this.Switch('display')
                        }}/>
                    }
                })
            }
            if (data.result[0].tag == true) {
                this.setState({
                    profileTag: true,
                    switches: {
                        profileTag: <Switch onChange={() => {
                            this.props.clickOnLink()
                            this.Switch('profileTag')
                        }} defaultChecked/>,
                        displayInSearch: this.state.switches.displayInSearch,
                    }
                })
            } else {
                this.setState({
                    switches: {
                        profileTag: <Switch onChange={() => {
                            this.props.clickOnLink()
                            this.Switch('profileTag')
                        }}/>,
                        displayInSearch: this.state.switches.displayInSearch,
                    }
                })
            }
            if (data.result[0].description !== null && data.result[0].display == true) {
                fetch2('teammates.getWall').then(data => {
                    let wall = []
                    data.result.map(el => {
                        let tag = "Профиль скрыт или отсутствует"
                        let verified = ""
                        if (el.tag != false && el.battletag !== undefined && el.battletag !== null)
                            tag = el.battletag
                        if (el.verified != false)
                            verified = <Icon12Verified fill="#4cad64"/>
                        wall.push(
                            <Card className="tap" key={el.id} style={{paddingBottom: 5, marginBottom: 10}} onClick={() => {
                                this.props.setActiveModal('profile', {
                                    avatar: el.avatar,
                                    user_id: el.user_id,
                                    name: el.name,
                                    text: el.description,
                                    battletag: el.battletag,
                                    tag: tag,
                                    verified: verified,
                                    discord: el.discord,
                                    age: el.age,
                                    time1: el.time1,
                                    time2: el.time2,
                                    microphone: el.microphone,
                                })
                            }}>
                                <SimpleCell disabled description={tag}
                                            after={<Icon28ChevronRightOutline/>}
                                            badge={verified} before={<Avatar size={40}
                                                                                                     src={el.avatar}/>}>{el.name}</SimpleCell>
                                <MiniInfoCell
                                    before={<Icon20ArticleOutline/>}
                                    textWrap="full"
                                    textLevel="primary"
                                >
                                    {el.description}
                                </MiniInfoCell>
                                <MiniInfoCell
                                    before={<Icon20UserCircleOutline/>}
                                    textWrap="full"
                                    textLevel="primary"
                                >
                                    {el.battletag ? "К профилю привязан игровой аккаунт" : "К профилю не привязан игровой аккаунт"}
                                </MiniInfoCell>
                                {el.verified == 1 &&
                                <MiniInfoCell
                                    before={<Icon20CheckCircleOutline fill="#4cad64"/>}
                                    textWrap="full"
                                    textLevel="primary"
                                >
                                    Разработчик или партнёр сервиса
                                </MiniInfoCell>
                                }
                            </Card>
                        )
                    })
                    this.setState({wall: wall})
                })
            }
            setTimeout(() => {this.setState({spinner: false})}, 500)
        })
    }

    Switch(type) {
        switch (type) {
            case 'display':
                if (this.state.display === true) {
                    fetch2('teammates.setSettings', 'type=display&display=0').then((data) => {
                        if (data.result === 'ok') {
                            bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"})
                            this.props.openTextPage("Эм, окей!", "Твой профиль скрыт из ленты", "Окей, спасибо!", "findteammate", true)
                        } else if (data.result === 'cooldown') {
                            bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"})
                            this.props.openTextPage("Эй, притормози!", "Переключать тумблеры можно раз в 5 секунд!", "Ладно-ладно!", "findteammate", false)
                        }
                    })
                } else {
                    fetch2('teammates.setSettings', 'type=display&display=1').then((data) => {
                        if (data.result === 'ok') {
                            bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"})
                            this.props.openTextPage("Вжух!", "Теперь твой профиль видят другие люди в ленте. К тому же, теперь тебе доступна эта самая лента.", "Круто!", "findteammate", true)
                        } else if (data.result === 'cooldown') {
                            bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"})
                            this.props.openTextPage("Эй, притормози!", "Переключать тумблеры можно раз в 5 секунд!", "Ладно-ладно!", "findteammate", false)
                        }
                    })
                }
                break
            case 'profileTag':
                if (this.state.profileTag === true) {
                    fetch2('teammates.setSettings', 'type=tag&tag=0').then((data) => {
                        if (data.result === 'ok') {
                            bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"})
                            this.props.openTextPage("А - анонимность", "Теперь твой батлнет-тег никто не увидит.", "Да я знаю, лол", "findteammate", true)
                        } else if (data.result === 'cooldown') {
                            bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"})
                            this.props.openTextPage("Эй, притормози!", "Переключать тумблеры можно раз в 5 секунд!", "Ладно-ладно!", "findteammate", false)
                        }
                    })
                } else {
                    fetch2('teammates.setSettings', 'type=tag&tag=1').then((data) => {
                        if (data.result === 'ok') {
                            bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"})
                            this.props.openTextPage("Включили, проверяй!", "Теперь любой человек в ленте увидит твой батлнет-тег.", "Понятненько", "findteammate", true)
                        } else if (data.result === 'cooldown') {
                            bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"})
                            this.props.openTextPage("Эй, притормози!", "Переключать тумблеры можно раз в 5 секунд!", "Ладно-ладно!", "findteammate", false)
                        }
                    })
                }
                break
        }
    }

    openPage(e) {
        this.setState({activeStory: e.currentTarget.dataset.story})
    }

    render() {
        let {id, go, user, snackbar} = this.props
        return (
            <Panel id={id} className="homePage">
                <Epic activeStory={this.state.activeStory} tabbar={
                    <Tabbar>
                    {this.state.spinner === true && <ScreenSpinner size='large'/>}
                    {this.state.spinner === false &&
                        <>
                            <TabbarItem
                            selected={this.state.activeStory === 'feed'}
                            data-story="feed"
                            onClick={this.openPage}
                            text="Лента"
                        ><Icon28NewsfeedOutline/></TabbarItem>
                        <TabbarItem
                            selected={this.state.activeStory === 'profile'}
                            data-story="profile"
                            onClick={this.openPage}
                            text="Профиль"
                        ><Icon28Profile/></TabbarItem>
                        </>
                    }
                    </Tabbar>}>
                    <Panel id="feed" activeStory="feed">
                        {this.state.spinner ? <PanelHeader separator={false}>Загрузка...</PanelHeader> : <PanelHeader separator={false}
                                     left={<PanelHeaderBack onClick={() => go('home')}/>}>Лента</PanelHeader>}
                        <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.fetching}>
                            {this.state.spinner === true && <ScreenSpinner size='large'/>}
                            {this.state.spinner === false &&
                            <Group>
                                <Div>
                                    {this.state.wall ? this.state.wall : <ContentCard
                                        subtitle="ПОЧЕМУ ЛЕНТА НЕ ЗАГРУЗИЛАСЬ???"
                                        disabled
                                        header="А где лента то?"
                                        text="Если у тебя не включено отображение профиля, то лента не будет загружаться. Чтобы исправить это - переключи тумблер в разделе 'Профиль'."
                                        maxheight={200}
                                    />}
                                </Div>
                            </Group>
                            }
                        </PullToRefresh>
                    </Panel>
                    <Panel id="profile" activeStory="profile">
                    {this.state.spinner ? <PanelHeader separator={false}>Загрузка...</PanelHeader> : <PanelHeader separator={false}>Профиль</PanelHeader>}
                        {this.state.spinner === true && <ScreenSpinner size='large'/>}
                        {this.state.spinner === false &&
                        <Div>
                            <Card style={{paddingBottom: 5}}>
                                {this.state.profile[0].verified == 1 &&
                                <SimpleCell disabled description={this.state.profileTag ? this.state.profile[0].battletag : "Профиль скрыт или отсутствует"}
                                            badge={<Icon12Verified fill="#4cad64"/>} before={<Avatar size={40}
                                                                                                     src={user.photo_200}/>}>{user.first_name} {user.last_name}</SimpleCell>}
                                {this.state.profile[0].verified == 0 &&
                                <SimpleCell disabled description={this.state.profileTag ? this.state.profile[0].battletag : "Профиль скрыт или отсутствует"}
                                            before={<Avatar size={40}
                                                            src={user.photo_200}/>}>{user.first_name} {user.last_name}</SimpleCell>}
                                <MiniInfoCell
                                    before={<Icon20ArticleOutline/>}
                                    textWrap="full"
                                    textLevel="primary"
                                >
                                    {this.state.profile[0].description ? this.state.profile[0].description : 'Информация отсутствует'}
                                </MiniInfoCell>
                                <MiniInfoCell
                                    before={<Icon20UserCircleOutline/>}
                                    textWrap="full"
                                    textLevel="primary"
                                >
                                    {this.state.profile[0].battletag ? 'К профилю привязан игровой аккаунт' : 'К профилю не привязан игровой аккаунт'}
                                </MiniInfoCell>
                                {this.state.profile[0].verified == 1 &&
                                <MiniInfoCell
                                    before={<Icon20CheckCircleOutline fill="#4cad64"/>}
                                    textWrap="full"
                                    textLevel="primary"
                                >
                                    Разработчик или партнёр сервиса
                                </MiniInfoCell>
                                }
                            </Card>
                            <Group mode="plain">
                                <Header>Настройки профиля</Header>
                                {this.state.profile[0].description !== null &&
                                <SimpleCell before={<Icon28GhostOutline/>} disabled
                                            description="Показывать тебя в ленте другим?"
                                            onChange={() => {
                                                this.props.clickOnLink()
                                            }}
                                            after={this.state.switches.displayInSearch}>Отображение
                                    профиля</SimpleCell>
                                }
                                {this.state.profile[0].description === null &&
                                <SimpleCell before={<Icon28GhostOutline/>}
                                            description="Недоступно, пока не заполнен профиль"
                                            onClick={() => {
                                                this.props.clickOnLink()
                                                go('settings')
                                            }}
                                            after={<Switch disabled />}>Отображение
                                    профиля</SimpleCell>
                                }
                                <SimpleCell onClick={() => {
                                    go('settings')
                                }} before={<Icon28ArticleOutline/>}
                                            description={this.state.profile[0].description ? this.state.profile[0].description : 'Расскажи о себе, ну же!'}
                                            after={<Icon28EditOutline/>}>Описание профиля</SimpleCell>
                                {this.state.profile[0].battletag !== null &&
                                <SimpleCell before={<Icon28UserSquareOutline/>} disabled
                                            description="Показывать тег профиля другим?"
                                            after={this.state.switches.profileTag}>{this.state.profile[0].battletag}</SimpleCell>
                                }
                            </Group>
                        </Div>
                        }
                    </Panel>
                </Epic>
                {snackbar}
            </Panel>
        )
    }
}

export default FindTeammate