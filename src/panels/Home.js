import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import crypto from 'crypto';
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
	CardScroll,
	ContentCard,
	PanelHeaderButton,
	ScreenSpinner
} from '@vkontakte/vkui';
import {
	Icon28Notifications,
	Icon28MoonOutline,
	Icon28HelpCircleOutline,
	Icon28HistoryBackwardOutline,
	Icon28FaceRecognitionOutline,
	Icon28PictureStackOutline,
	Icon28MasksOutline,
	Icon28FireOutline,
	Icon28SparkleOutline,
	Icon48DonateOutline,
} from '@vkontakte/icons';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			snackbar: null,
			arcades: [],
			subscribed: false,
			alert: null,
			spinner: true,
			request: false,
			changed: false,
		};
	}
	verify() {
		if (this.state.request == false) {
			{this.props.user &&
				fetch('https://cloud.irbot.net/ow_arcade/api?act=subscribed&key=atQ9fP8qbNZUZ5Qm&user_id='+this.props.user.id)
					.then(response => response.json())
					.then(data => {
						if (data.subscribed == true) {
							this.setState({request: true, alert: <SimpleCell onClick={() => this.changeSubscribe(true)} before={<Icon28Notifications />} after={<Switch defaultChecked />}>Рассылка с аркадами</SimpleCell>});
						} else {
							this.setState({request: true, alert: <SimpleCell onClick={() => this.changeSubscribe(false)} before={<Icon28Notifications />} after={<Switch />}>Рассылка с аркадами</SimpleCell>});
						}
					});
			}	
		}
	}
	componentDidUpdate() {
		if (this.state.changed == true) {
			if (this.state.subscribed == true) {
				this.setState({changed: false, alert: <SimpleCell onClick={() => this.changeSubscribe(true)} before={<Icon28Notifications />} after={<Switch defaultChecked />}>Рассылка с аркадами</SimpleCell>});
			} else {
				this.setState({changed: false, alert: <SimpleCell onClick={() => this.changeSubscribe(false)} before={<Icon28Notifications />} after={<Switch />}>Рассылка с аркадами</SimpleCell>});
			}
		}
	}
	componentDidMount() {
		try	{
			fetch('https://cloud.irbot.net/ow_arcade/api?act=arcades&key=atQ9fP8qbNZUZ5Qm')
			.then(response => response.json())
			.then(data => {
				let arcades = [];
				for (let b = 0; b < 7; b++) {
					arcades.push(<ContentCard
						image={data.result.arcades[b].img}
						subtitle={"Аркада #" + (b+1)}
						header={data.result.arcades[b].name}
						caption={"Игроков: " + data.result.arcades[b].players}
						disabled
						key={crypto.randomBytes(20).toString('hex')}
						style={{ marginBottom: "50px" }}
					/>);
				}
			this.setState({arcades: arcades});
		});
		} catch (err) {
			console.log(err);
		}
		// УБРАТЬ ЭТОТ НЕДОФИКС
		setTimeout(() => { this.setState({spinner: false}); }, 600);
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
			}
		}
	}
	render() {
		this.verify();
		let {id, go, snackbarError} = this.props;
		return (
			<Panel id={id}>
				{this.state.spinner === true && <ScreenSpinner size='large' />}
				{this.state.spinner === false && 
				<div>
					<PanelHeader left={<PanelHeaderButton onClick={go} data-to="faq"><Icon28HelpCircleOutline/></PanelHeaderButton>}>Главная</PanelHeader>
					<Banner before={<Icon48DonateOutline />} onClick={go} data-to="weeklyskin" header={"До конца еженедельного испытания осталось " + moment("2021-02-19").diff(moment().format(), "days") + " д."} asideMode="expand" />
					<Group>
						<CardScroll size="s" style={{ marginBottom: "-50px" }}>
							{this.state.arcades}
						</CardScroll>
					</Group>
					<Group header={<Header mode="secondary">Приветствуем, герой!</Header>}>
						<SimpleCell onClick={go} data-to="news" expandable before={<Icon28FireOutline />}>Новости</SimpleCell>
						<SimpleCell onClick={go} data-to="update" expandable before={<Icon28MoonOutline />}>Лунный новый год</SimpleCell>
						<SimpleCell onClick={go} data-to="mems" expandable before={<Icon28MasksOutline />}>Мемы</SimpleCell>
						<SimpleCell onClick={go} data-to="screenshots" expandable before={<Icon28FaceRecognitionOutline />}>Скриншоты персонажей</SimpleCell>
						<SimpleCell onClick={go} data-to="arts" expandable before={<Icon28PictureStackOutline />}>Арты</SimpleCell>
					</Group>
					<Group header={<Header mode="secondary">Развлечения</Header>}>
						<SimpleCell onClick={go} data-to="randomgg" expandable before={<Icon28SparkleOutline />}>Случайный голдган</SimpleCell>
					</Group>
					<Group header={<Header mode="secondary">Аркады и описание приложения</Header>}>
						<SimpleCell onClick={go} data-to="history" expandable before={<Icon28HistoryBackwardOutline />}>История аркад</SimpleCell>
						{this.state.alert}
					</Group>
				</div>}
          		{this.state.snackbar}
          		{snackbarError}
			</Panel>
		)
	}
};

export default Home;