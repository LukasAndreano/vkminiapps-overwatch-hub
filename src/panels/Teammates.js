import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import crypto from 'crypto';
import {
	Panel,
	View,
	PanelHeader,
	PanelHeaderBack,
	Group,
	ContentCard,
	Button,
	CardGrid,
	Tabs,
	HorizontalScroll,
	TabsItem,
	Snackbar,
	Div,
	Avatar,
	ScreenSpinner,
	Tabbar,
	TabbarItem,
	Epic,
} from '@vkontakte/vkui';

import OverwatchDailyArcadeIcon from '../img/ow_arcade.jpg';

import {
	Icon28UserCircleOutline,
	Icon28NarrativeOutline,
	Icon28NewsfeedOutline
} from '@vkontakte/icons';
import { request } from 'http';

class Teammates extends React.Component {
    constructor (props) {
		super(props);
		this.state = {
		  snackbar: null,
		  activeStory: 'feed',
		}
		this.openPage = this.openPage.bind(this);
	}
	openPage(e) {
		this.setState({activeStory: e.currentTarget.dataset.story});
	}
	render() {
		let {id, go} = this.props;
		return (
		<Panel id={id}>
			<Epic activeStory={this.state.activeStory} tabbar={
			<Tabbar>
				<TabbarItem
				selected={this.state.activeStory === 'feed'}
				data-story="feed"
				onClick={this.openPage}
				text="Лента"
				><Icon28NewsfeedOutline /></TabbarItem>
				<TabbarItem
				selected={this.state.activeStory === 'requests'}
				onClick={this.openPage}
				data-story="requests"
				label="1"
				text="Заявки"
				><Icon28NarrativeOutline /></TabbarItem>
				<TabbarItem
				selected={this.state.activeStory === 'profile'}
				data-story="profile"
				onClick={this.openPage}
				text="Профиль"
				><Icon28UserCircleOutline/></TabbarItem>
			</Tabbar>}>
			<Div id="feed" activePanel="feed">
				<Panel id="feed">
				<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>Лента</PanelHeader>
				</Panel>
			</Div>
			<Div id="requests" activePanel="requests">
				<Panel id="requests">
				<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>Заявки</PanelHeader>
				</Panel>
			</Div>
			<Div id="profile" activePanel="profile">
				<Panel id="profile">
				<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>Мой профиль</PanelHeader>
				</Panel>
			</Div>
			</Epic>
			{this.state.spinner === true && <ScreenSpinner size='large' />}
          	{this.state.snackbar}
		</Panel>
		)
	}
}

export default Teammates;