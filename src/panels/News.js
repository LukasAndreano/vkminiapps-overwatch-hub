import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Group,
	ContentCard,
	Div,
	Card,
	Title,
	Text,
	Button,
	CardGrid,
	Snackbar,
	Avatar,
	ScreenSpinner
} from '@vkontakte/vkui';

import OverwatchDailyArcadeIcon from '../img/ow_arcade.jpg';

class News extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
		text: '',
		snackbar: null,
		request: false,
		spinner: true,
		rows: [],
      }
      this.OpenPost = this.OpenPost.bind(this);
    }
    OpenPost() {
    	bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
		this.setState({snackbar:
			<Snackbar
			    onClose={() => this.setState({ snackbar: null })}
			    before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}
			>
			    Открываем публикацию...
			</Snackbar>
		});
    }
	getWall(group_id, group_name) {
		if (this.state.request === false) {
			this.setState({ request: true });
		fetch('https://cloud.irbot.net/ow_arcade/request?method=wall.get&owner_id=-' + group_id + '&count=100')
			.then(response => response.json())
			.then(data => {
				var rows = [];
				for (var i = 0; i < 100; i++) {
					if (data.posts.response.items[i].marked_as_ads == 0 && data.posts.response.items[i].text.search('#news@overwatchschool') != -1) {
						rows.push(<ContentCard
							image={data.img[i]}
							text={data.posts.response.items[i].text}
							caption={group_name}
							disabled
						/>);
						rows.push(
							<Button size="l" onClick={this.OpenPost} style={{ marginTop: '10px', marginBottom: '20px' }} stretched mode="secondary" href={"https://vk.com/club" + group_id + "?w=wall-" + group_id + "_" + data.posts.response.items[i].id}>Перейти к публикации</Button>
						);
					}
				}
				this.setState({ rows: rows, spinner: false });
			});
		}
	}
	render() {
		let {id, go} = this.props;
		this.getWall('140691640', 'Overwatch School');
		return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>} >
				НОВОСТИ
			</PanelHeader>
			{this.state.spinner === true && <ScreenSpinner size='large' />}
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
					{this.state.rows}
				</CardGrid>
			</Group>
			{this.state.text && <Group><Div>{this.state.text}</Div></Group>}
          	{this.state.snackbar}
		</Panel>
		)
	}
}

export default News;