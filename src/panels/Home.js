import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import moment from 'moment';
import OverwatchDailyArcadeIcon from '../img/ow_arcade.jpg';
import {
	Avatar,
	Group,
	Header,
	PanelHeader,
	Panel,
	SimpleCell,
	Snackbar,
	Banner,
	Switch,
	Card,
	Div,
	Title,
	Text,
	CardScroll,
	PromoBanner,
	PanelHeaderButton,
	ContentCard,
	Button,
	Tabbar,
	TabbarItem,
	CardGrid,
	Epic,
} from '@vkontakte/vkui';
import {
	Icon28Notifications,
	Icon28MoonOutline,
	Icon28NewsfeedOutline,
	Icon28HelpCircleOutline,
	Icon28FaceRecognitionOutline,
	Icon28PictureStackOutline,
	Icon28MasksOutline,
	Icon28SparkleOutline,
	Icon48DonateOutline,
	Icon28AllCategoriesOutline,
	Icon28GameOutline,
} from '@vkontakte/icons';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			snackbar: null,
			arcades: [],
			subscribed: false,
			alert: null,
			request: false,
			changed: false,
			activeStory: 'menu',
			groups: [
				{
					id: '140691640',
					name: 'Overwatch School',
					rows: [],
				},
			]
		};
		this.openPage = this.openPage.bind(this);
	}
	verify() {
		if (this.state.request == false) {
			{this.props.user &&
				fetch('https://cloud.irbot.net/ow_arcade/api?act=subscribed&key=atQ9fP8qbNZUZ5Qm&user_id='+this.props.user.id)
					.then(response => response.json())
					.then(data => {
						if (data.subscribed == true) {
							this.setState({request: true, alert: <SimpleCell onChange={() => this.changeSubscribe(true)} before={<Icon28Notifications />} after={<Switch defaultChecked />}>Рассылка с аркадами</SimpleCell>});
						} else {
							this.setState({request: true, alert: <SimpleCell onChange={() => this.changeSubscribe(false)} before={<Icon28Notifications />} after={<Switch />}>Рассылка с аркадами</SimpleCell>});
						}
					});
			}	
		}
	}
	componentDidUpdate() {
		if (this.state.changed == true) {
			if (this.state.subscribed == true) {
				this.setState({changed: false, alert: <SimpleCell onChange={() => this.changeSubscribe(true)} before={<Icon28Notifications />} after={<Switch defaultChecked />}>Рассылка с аркадами</SimpleCell>});
			} else {
				this.setState({changed: false, alert: <SimpleCell onChange={() => this.changeSubscribe(false)} before={<Icon28Notifications />} after={<Switch />}>Рассылка с аркадами</SimpleCell>});
			}
		}
	}
	componentDidMount() {
		for	(let b = 0; b < this.state.groups.length; b++) {
			bridge.send("VKWebAppCallAPIMethod", {"method": "wall.get", "params": {"owner_id": "-" + this.state.groups[b].id, "count": 100, "offset": 1, "v":"5.130", "access_token":"6e1c099a6e1c099a6e1c099a0d6e69de1166e1c6e1c099a31e5668f51c802fa62b5057e"}})
			.then(data => {
					let rows = [];
					for (var i = 0; i < 100; i++) {
						try {
							if (data.response.items[i].marked_as_ads == 0 && data.response.items[i].attachments[0].photo && data.response.items[i].text.search('#news@overwatchschool') !== -1) {
								rows.push(<a rel="noopener noreferrer" target="_blank" href={"https://vk.com/club" + this.state.groups[b].id + "?w=wall-" + this.state.groups[b].id + "_" + data.response.items[i].id}>
									<ContentCard
									image={data.response.items[i].attachments[0].photo.sizes.pop().url}
									text={data.response.items[i].text}
									caption={this.state.groups[b].name}
									disabled
								/>
								</a>);
								rows.push(
									<Button size="l" rel="noopener noreferrer" style={{ marginTop: '10px', marginBottom: '20px' }} target="_blank" stretched mode="secondary" href={"https://vk.com/club" + this.state.groups[b].id + "?w=wall-" + this.state.groups[b].id + "_" + data.response.items[i].id}>Перейти к публикации</Button>
								);
							}
						} catch (err) {
							console.log(err);
						}
					}
					this.state.groups[b].rows = rows;
					this.setState(this.state.groups[b].rows);
			})
			.catch(err => {
				this.setState({snackbar:
					<Snackbar
						onClose={() => this.setState({ snackbar: null })}
					>
						Не удалось загрузить данные
					</Snackbar>
				});
			});
		}
	}
	componentWillUnmount() {
		for	(let b = 0; b < this.state.groups.length; b++) {
			this.state.groups[b].rows = null;
			this.setState(this.state.groups[b].rows);
		}
	}
	changeSubscribe(subscribed) {
		let {user} = this.props;
		if (subscribed == true) {
			{user &&
				fetch('https://cloud.irbot.net/ow_arcade/api?act=unsubscribe&key=atQ9fP8qbNZUZ5Qm&user_id='+user.id)
					.then(response => response.json())
					.then(data => {
						bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
						this.setState({subscribed: false, changed: true, snackbar:
							<Snackbar
								onClose={() => this.setState({ snackbar: null })}
								before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}
							>
								Рассылка отключена
							</Snackbar>
						});
					})
				}
		} else {
			{user &&
				bridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": 197332265})
				.then(data => {
					fetch('https://cloud.irbot.net/ow_arcade/api?act=subscribe&key=atQ9fP8qbNZUZ5Qm&user_id='+user.id)
						.then(response => response.json())
						.then(data => {
							bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
							this.setState({subscribed: true, changed: true, snackbar:
								<Snackbar
								    onClose={() => this.setState({ snackbar: null  })}
								    before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}
								>
								    Рассылка активирована
								</Snackbar>
							});
						});
				})
				.catch(error => {
					bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"});
					this.setState({subscribed: false, changed: true, alert: false});
					this.setState({snackbar:
					    <Snackbar
					      onClose={() => this.setState({ snackbar: null })}
					      before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}
					    >
					    	Подписка на рассылку отменена
					    </Snackbar>
					});
				});
			}
		}
	}
	openPage(e) {
		let scroll;
		switch (this.state.activeStory) {
			case 'feed': 
				if (window.scrollY !== 0)
					this.props.saveScroll(0, window.scrollY);
			break;
			case 'arcades': 
				if (window.scrollY !== 0)
					this.props.saveScroll(1, window.scrollY);
			break;
		}
		switch (e.currentTarget.dataset.story) {
			case 'feed':
				scroll = this.props.getScroll(0);
				if (scroll !== 0)
					setTimeout(() => {window.scroll({ top: scroll, left: 0, behavior: 'smooth' });}, 100);
			break;
			case 'arcades':
				scroll = this.props.getScroll(1);
				if (scroll !== 0)
					setTimeout(() => {window.scroll({ top: scroll, left: 0, behavior: 'smooth' });}, 100);
			break;
		}
		this.setState({activeStory: e.currentTarget.dataset.story});
	}
	render() {
		this.verify();
		let {id, go, snackbarError} = this.props;
		return (
			<Panel id={id}>
			<Epic activeStory={this.state.activeStory} tabbar={
			<Tabbar>
				<TabbarItem
				selected={this.state.activeStory === 'feed'}
				data-story="feed"
				onClick={this.openPage}
				text="Новости"
				><Icon28NewsfeedOutline /></TabbarItem>
				<TabbarItem
				selected={this.state.activeStory === 'menu'}
				data-story="menu"
				onClick={this.openPage}
				text="Меню"
				><Icon28AllCategoriesOutline/></TabbarItem>
				<TabbarItem
				selected={this.state.activeStory === 'arcades'}
				data-story="arcades"
				onClick={this.openPage}
				text="Аркады"
				><Icon28GameOutline/></TabbarItem>
			</Tabbar>}>
				<Panel id="feed" activeStory="feed">
					<PanelHeader separator={false}>Новости</PanelHeader>
					<Div>
						<Card>
							<Div>
								<Title level="2" weight="heavy" style={{ marginBottom: 10 }}>Как работает этот раздел?</Title>
								<Text weight="regular">В данный момент этот раздел отображает публикации только с одной группы. Все публикации, которые помечены как "новости", собраны здесь. Благодарим Overwatch School за этот контент.</Text>
							</Div>
						</Card>	
					</Div>
					<Group>
						<CardGrid size="l">
							{this.state.groups[0].rows}
						</CardGrid>
					</Group>
				</Panel>
				<Panel id="menu" activeStory="menu">
					<PanelHeader separator={false} left={<PanelHeaderButton onClick={go} data-to="faq"><Icon28HelpCircleOutline/></PanelHeaderButton>}>Главная</PanelHeader>
					<Group>
					<Banner before={<Icon48DonateOutline />} onClick={go} data-to="weeklyskin" header={"До конца еженедельного испытания осталось: " + moment("2021-02-26").diff(moment().format(), "days") + " д."} asideMode="expand" />
						<SimpleCell onClick={go} data-to="update" expandable before={<Icon28MoonOutline />}>Лунный Новый год</SimpleCell>
						<SimpleCell onClick={go} data-to="mems" expandable before={<Icon28MasksOutline />}>Мемы</SimpleCell>
						<SimpleCell onClick={go} data-to="screenshots" expandable before={<Icon28FaceRecognitionOutline />}>Скриншоты персонажей</SimpleCell>
						<SimpleCell onClick={go} data-to="arts" expandable before={<Icon28PictureStackOutline />}>Арты</SimpleCell>
						<SimpleCell onClick={go} data-to="randomgg" expandable before={<Icon28SparkleOutline />}>Случайный голдган</SimpleCell>
					</Group>
				</Panel>
				<Panel id="arcades" activeStory="arcades">
					<PanelHeader separator={false}>Аркады</PanelHeader>
					<Group header={<Header mode="secondary">СПИСОК АРКАД НА СЕГОДНЯ</Header>}>
						<CardScroll size="s" style={{ marginBottom: "-50px" }}>
							{this.props.arcades}
						</CardScroll>
					</Group>
					<Group header={<Header mode="secondary">ИСТОРИЯ АРКАД ЗА ПОСЛЕДНИЕ 3 ДНЯ</Header>}>
						<CardScroll size="m" style={{ marginBottom: "-50px" }}>
							<ContentCard
								image={this.props.arcadesHistory.img1}
								disabled
								style={{ marginBottom: "50px" }}
								onClick={() => {console.log('ok');}}
								header="Аркады сегодня"
							/>
							<ContentCard
								image={this.props.arcadesHistory.img2}
								disabled
								style={{ marginBottom: "50px" }}
								header="Аркады вчера"
							/>
							<ContentCard
								image={this.props.arcadesHistory.img3}
								disabled
								style={{ marginBottom: "50px" }}
								header="Аркады позавчера"
							/>
						</CardScroll>
					</Group>
				<Div>
					<Card>
						<Div>
							{this.state.alert}
						</Div>
					</Card>
				</Div>
				<Div>
					<Card>
						<Div>
							<Title level="2" weight="heavy" style={{ marginBottom: 10 }}>Где, допустим, аркады за прошлый месяц?</Title>
							<Text weight="regular">Здесь отображены аркады за последние 3 дня, включая сегодняший. Чтобы посмотреть аркады за всё время работы Overwatch Daily Arcade, нажмите на соответствующую кнопку ниже. Кнопка перенаправит Вас на наше официальное сообщество.</Text>
						</Div>
					</Card>	
				</Div>
				<Div>
					<Button size="l" stretched mode="secondary" target = "_blank" href="https://vk.com/ow.arcade">Перейти в сообщество</Button>
				</Div>
				</Panel>
			</Epic>
          	{this.state.snackbar}
          	{snackbarError}
			</Panel>
		)
	}
};

export default Home;