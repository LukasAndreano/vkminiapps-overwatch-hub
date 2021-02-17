import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Group,
	Header,
	CardScroll,
	ContentCard,
	Button,
	Snackbar,
	Avatar,
	Text,
	Div,
	Card,
	Title,
} from '@vkontakte/vkui';

import OverwatchDailyArcadeIcon from '../img/ow_arcade.jpg';

class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			snackbar: null,
			wall: {
				img1: null,
				img2: null,
				img3: null,
			},
		};
	}
	componentDidMount() {
		bridge.send("VKWebAppCallAPIMethod", {"method": "wall.get", "params": {"count": "3", "offset": "1", "owner_id": "-197332265", "v":"5.130", "access_token":"6e1c099a6e1c099a6e1c099a0d6e69de1166e1c6e1c099a31e5668f51c802fa62b5057e"}})
		.then(data => {
			this.setState({wall: {img1: data.response.items[0].attachments[0].photo.sizes[2].url, img2: data.response.items[1].attachments[0].photo.sizes[2].url, img3: data.response.items[2].attachments[0].photo.sizes[2].url}})
		})
		.catch(error => {
			bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"});
			this.setState({snackbar:
				<Snackbar
				  onClose={() => this.setState({ snackbar: null })}
				  before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}
				>
					Не удалось загрузить историю аркад
				</Snackbar>
			});
		});	
	}
	componentWillUnmount() {
		this.setState({wall: {img1: null, img2: null, img3: null}});
	}
	render() {
		let {id, go} = this.props;
		return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>} >
				История аркад
			</PanelHeader>
			<Group header={<Header mode="secondary">ИСТОРИЯ АРКАД ЗА ПОСЛЕДНИЕ 3 ДНЯ</Header>}>
				<CardScroll size="m" style={{ marginBottom: "-50px" }}>
					<ContentCard
						image={this.state.wall.img1}
						disabled
						style={{ marginBottom: "50px" }}
						header="Аркады сегодня"
					/>
					<ContentCard
						image={this.state.wall.img2}
						disabled
						style={{ marginBottom: "50px" }}
						header="Аркады вчера"
					/>
					<ContentCard
						image={this.state.wall.img3}
						disabled
						style={{ marginBottom: "50px" }}
						header="Аркады позавчера"
					/>
				</CardScroll>
			</Group>
			<Div>
				<Card>
					<Div>
						<Title level="2" weight="heavy" style={{ marginBottom: 10 }}>Где, допустим, аркады за прошлый месяц?</Title>
						<Text weight="regular">Здесь отображены аркады за последние 3 дня, включая сегодняший. Чтобы посмотреть аркады за всё время работы Overwatch Daily Arcade, нажмите на соответствующую кнопку ниже. Кнопка перенаправит Вас на наше официальное сообщество.</Text>
					</Div>
				</Card>	
			</Div>
		    <Div>
		      <Button size="l" stretched mode="secondary" href="https://vk.com/ow.arcade">Перейти в сообщество</Button>
		    </Div>
          	{this.state.snackbar}
		</Panel>
		)
	}
}

export default History;