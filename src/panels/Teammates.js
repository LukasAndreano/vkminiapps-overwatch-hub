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
	Card,
	Switch,
	Header,
	HorizontalScroll,
	TabsItem,
	Snackbar,
	Banner,
	Div,
	Title,
	Text,
	Avatar,
	MiniInfoCell,
	ScreenSpinner,
	Tabbar,
	SimpleCell,
	TabbarItem,
	Epic,
	Cell,
} from '@vkontakte/vkui';

import {
	Icon28UserCircleOutline,
	Icon28NarrativeOutline,
	Icon28NewsfeedOutline,
	Icon24FavoriteOutline,
	Icon24CupOutline,
	Icon24LogoLivejournal,
	Icon24CommentOutline
} from '@vkontakte/icons';

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
			<Panel id="feed" activePanel="feed">
				<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>Лента</PanelHeader>
				<Banner
					mode="image"
					header="Как работает этот раздел?"
					subheader="Расскажем, как работает этот раздел и что здесь нужно делать."
					background={<div style={{background: 'linear-gradient(90deg, rgba(101,192,99,1) 0%, rgba(121,231,119,1) 100%)',}}/>}
					actions={<Button mode="overlay_primary" onClick={go} data-to="teammatesguide">Подробнее</Button>}
				/>
				<Banner  before={<Avatar size={48} mode="image" src={this.props.user.photo_200} />}
        header="Nikita Balin - Танк, Урон, Хил"
        subheader="Коротко о себе: твой личный покет мёрси - хилю как бог, сливаюсь как нуб "
        actions={<Button>Открыть анкету</Button>}
      />

			</Panel>
			<Panel id="requests" activePanel="requests">
				<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>Заявки</PanelHeader>
			</Panel>
			<Panel id="profile" activePanel="profile">
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>Мой профиль</PanelHeader>
				<Div>
					<Card>
						<SimpleCell
							style={{padding: 10, borderRadius: 10}}
							before={this.props.user.photo_200 ? <Avatar src={this.props.user.photo_200}/> : null}
							description="Местный мёрсимейн"
							after={<Switch />}
						>
						{`${this.props.user.first_name} ${this.props.user.last_name}`}
						</SimpleCell>
					</Card>
					<Card style={{marginTop: 10}}>
						<Group>
							<MiniInfoCell before={<Icon24FavoriteOutline />}>
								Игровые роли: Танк, Урон, Хил
							</MiniInfoCell>
							<MiniInfoCell before={<Icon24CupOutline />}>
								Ранг в соревновательной игре: <br /> Хил - платина <br /> Урон - нет ранга <br /> Танк - золото 
							</MiniInfoCell>
							<MiniInfoCell before={<Icon24LogoLivejournal />} textWrap="short">
								Коротко о себе: твой личный покет мёрси - хилю как бог, сливаюсь как нуб 
							</MiniInfoCell>
						</Group>
					</Card>
					<Card style={{marginTop: 10}}>
						<Group>
							<MiniInfoCell before={<Icon24CommentOutline />} textWrap="full">
								Подробная информация: Твоя песенка спета, колонки молчат. Я сделал больно и покинул чат. Вокруг тебя много нормальных девчат, но лишь я сделал больно и покинул чат, чат, чат, чат, чат.
							</MiniInfoCell>
						</Group>
					</Card>
					<Button style={{marginTop: 10}} size="l" stretched mode="secondary">Изменить информацию</Button>
				</Div>
			</Panel>
			</Epic>
			{this.state.spinner === true && <ScreenSpinner size='large' />}
          	{this.state.snackbar}
		</Panel>
		)
	}
}

export default Teammates;