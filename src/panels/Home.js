import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import OverwatchDailyArcadeIcon from '../img/ow_arcade.jpg';
import {
	Avatar,
	Div,
	Cell,
	Group,
	Header,
	PanelHeader,
	Panel,
	SimpleCell,
	Snackbar,
	Footer,
	Switch,
	CardScroll,
	ContentCard
} from '@vkontakte/vkui';
import {
	Icon28UsersOutline,
	Icon28Notifications,
	Icon28MoonOutline,
	Icon28HelpCircleOutline,
	Icon28HistoryBackwardOutline,
	Icon28ArticleOutline,
	Icon28FaceRecognitionOutline,
	Icon28PictureStackOutline,
	Icon28MasksOutline,
	Icon28FireOutline
} from '@vkontakte/icons';

var request = require('sync-request');

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			snackbar: null,
			request: false,
			subscribed: false,
		};
		this.subscribeme = this.subscribeme.bind(this);
		this.unsubscribeme = this.unsubscribeme.bind(this);
	}
	verify() {
		if (this.state.request === false) {
			{this.props.user &&
			fetch('https://cloud.irbot.net/ow_arcade/api?act=subscribed&key=atQ9fP8qbNZUZ5Qm&user_id='+this.props.user.id)
				.then(response => response.json())
				.then(data => this.setState({ subscribed: data.subscribed, request: true}));
			}
		}
	}
	subscribeme() {
		let {user} = this.props;
		{user &&
			bridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": 197332265})
			.then(data => {
				fetch('https://cloud.irbot.net/ow_arcade/api?act=subscribe&key=atQ9fP8qbNZUZ5Qm&user_id='+user.id)
					.then(response => response.json())
					.then(data => {
						bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
						this.setState({ subscribed: data.subscribed });
						this.setState({snackbar:
							<Snackbar
							    onClose={() => this.setState({ snackbar: null })}
							    before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}
							>
							    Рассылка активирована
							</Snackbar>
						});
					});
			})
			.catch(error => {
				bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"});
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
	unsubscribeme() {
		let {user} = this.props;
		{user &&
		fetch('https://cloud.irbot.net/ow_arcade/api?act=unsubscribe&key=atQ9fP8qbNZUZ5Qm&user_id='+user.id)
			.then(response => response.json())
			.then(data => {
				bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
				this.setState({ subscribed: data.subscribed });
				this.setState({snackbar:
					<Snackbar
					    onClose={() => this.setState({ snackbar: null })}
					    before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}
					>
					    Рассылка отключена
					</Snackbar>
				});
			});
		}
	}
	render() {
		this.verify();
		let {id, go, arcades, snackbarError} = this.props;
		return (
			<Panel id={id}>
				<PanelHeader>OW HUB</PanelHeader>
				<Group>
					<CardScroll size="s" style={{ marginBottom: "-50px" }}>
			            <ContentCard
			              image={arcades.result.arcade1.img}
			              subtitle="Аркада #1"
			              header={arcades.result.arcade1.name}
			              caption={"Игроков: " + arcades.result.arcade1.players}
			              disabled
			              style={{ marginBottom: "50px" }}
			            />
			            <ContentCard
			              image={arcades.result.arcade2.img}
			              subtitle="Аркада #2"
			              header={arcades.result.arcade2.name}
			              caption={"Игроков: " + arcades.result.arcade2.players}
			              disabled
			              style={{ marginBottom: "50px" }}
			            />
			            <ContentCard
			              image={arcades.result.arcade3.img}
			              subtitle="Аркада #3"
			              header={arcades.result.arcade3.name}
			              caption={"Игроков: " + arcades.result.arcade3.players}
			              disabled
			              style={{ marginBottom: "50px" }}
			            />
			            <ContentCard
			              image={arcades.result.arcade4.img}
			              subtitle="Аркада #4"
			              header={arcades.result.arcade4.name}
			              caption={"Игроков: " + arcades.result.arcade4.players}
			              disabled
			              style={{ marginBottom: "50px" }}
			            />
			            <ContentCard
			              image={arcades.result.arcade5.img}
			              subtitle="Аркада #5"
			              header={arcades.result.arcade5.name}
			              caption={"Игроков: " + arcades.result.arcade5.players}
			              disabled
			              style={{ marginBottom: "50px" }}
			            />
			            <ContentCard
			              image={arcades.result.arcade6.img}
			              subtitle="Аркада #6"
			              header={arcades.result.arcade6.name}
			              caption={"Игроков: " + arcades.result.arcade6.players}
			              disabled
			              style={{ marginBottom: "50px" }}
			            />
			            <ContentCard
			              image={arcades.result.arcade7.img}
			              subtitle="Аркада #7"
			              header={arcades.result.arcade7.name}
			              caption={"Игроков: " + arcades.result.arcade7.players}
			              disabled
			              style={{ marginBottom: "50px" }}
			            />
					</CardScroll>
				</Group>
				<Group header={<Header mode="secondary">Приветствуем, герой!</Header>}>
					<SimpleCell onClick={go} data-to="news" expandable before={<Icon28FireOutline />}>Новости</SimpleCell>
					<SimpleCell onClick={go} data-to="update" expandable before={<Icon28MoonOutline />}>Лунный новый год</SimpleCell>
					<SimpleCell onClick={go} data-to="mems" expandable before={<Icon28MasksOutline />}>Мемы</SimpleCell>
					<SimpleCell onClick={go} data-to="screenshots" expandable before={<Icon28FaceRecognitionOutline />}>Скриншоты персонажей</SimpleCell>
					<SimpleCell onClick={go} data-to="arts" expandable before={<Icon28PictureStackOutline />}>Арты</SimpleCell>
					<SimpleCell onClick={go} data-to="history" expandable before={<Icon28HistoryBackwardOutline />}>История аркад</SimpleCell>
					{this.state.subscribed
					? <SimpleCell onClick={this.unsubscribeme} before={<Icon28Notifications />} after={<Switch defaultChecked />}>Рассылка с аркадами</SimpleCell>
					: <SimpleCell onClick={this.subscribeme} before={<Icon28Notifications />} after={<Switch />}>Рассылка с аркадами</SimpleCell>}
					<SimpleCell onClick={go} data-to="faq" expandable before={<Icon28HelpCircleOutline />}>Описание приложения</SimpleCell>
				</Group>
				<Footer>Обновляется каждый день в 07:00 по МСК</Footer>
			    {this.state.text && <Group><Div>{this.state.text}</Div></Group>}
          		{this.state.snackbar}
          		{snackbarError}
			</Panel>
		)
	}
};

export default Home;