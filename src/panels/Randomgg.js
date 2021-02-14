import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Group,
	ContentCard,
	Div,
	Button,
	CardGrid,
	Tabs,
	HorizontalScroll,
	TabsItem,
	Snackbar,
	Avatar,
	ScreenSpinner,
} from '@vkontakte/vkui';

import OverwatchDailyArcadeIcon from '../img/ow_arcade.jpg';

class Randomgg extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
		text: '',
		snackbar: null,
		rows: [],
		request: false,
		spinner: true,
        activeTab: 'all',
      }
      this.OpenPost = this.OpenPost.bind(this);
      this.getWall = this.getWall('166328226', 'Скриншоты Мерки | Mercy Overwatch');
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
    changePage(page, group_id, group_name) {
    	bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
    	this.setState({ activeTab: page, rows: null, spinner: true });
		fetch('https://cloud.irbot.net/ow_arcade/request?method=wall.get&owner_id=-' + group_id + '&count=30')
			.then(response => response.json())
			.then(data => {
				var rows = [];
				for (var i = 0; i < 30; i++) {
					if (data.posts.response.items[i].marked_as_ads == 0 && data.img[i]) {
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
	getWall(group_id, group_name) {
		fetch('https://cloud.irbot.net/ow_arcade/request?method=wall.get&owner_id=-' + group_id + '&count=30')
			.then(response => response.json())
			.then(data => {
				var rows = [];
				for (var i = 0; i < 30; i++) {
					if (data.posts.response.items[i].marked_as_ads == 0 && data.img[i]) {
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
	render() {
		let {id, go} = this.props;
		return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>} >
				Поиск напарника
			</PanelHeader>
			{this.state.spinner === true && <ScreenSpinner size='large' />}
	            <Tabs>
	                <HorizontalScroll>
	                  <TabsItem onClick={() => this.changePage('mercy', 166328226, 'Скриншоты Мерки | Mercy Overwatch')} selected={this.state.activeTab === 'mercy'}>
	                    Мерка
	                  </TabsItem>
	                  <TabsItem onClick={() => this.changePage('sym', 194929460, 'Скриншоты Симметры | Symmetra Overwatch')} selected={this.state.activeTab === 'sym'}>
	                    Симметра
	                  </TabsItem>
	                </HorizontalScroll>
	            </Tabs>
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

export default Randomgg;