import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import smoothscroll from 'smoothscroll-polyfill';
import queryString from 'query-string'
import '@vkontakte/vkui/dist/vkui.css';
import {
	View,
	Snackbar,
	Avatar,
	ScreenSpinner,
	ContentCard,
	ConfigProvider,
} from '@vkontakte/vkui';

import OverwatchDailyArcadeIcon from './img/ow_arcade.jpg';

import "./css/Index.css";

import Home from './panels/Home';
import Intro from './panels/Intro';
import Update from './panels/Update';
import FAQ from './panels/FAQ';
import Screenshots from './panels/Screenshots';
import Arts from './panels/Arts';
import Mems from './panels/Mems';
import Randomgg from './panels/Randomgg';
import Gameprofile from './panels/Gameprofile';
import Offline from './panels/Offline';

const ROUTES = {
	HOME: 'home',
	INTRO: 'intro',
	UPDATE: 'update',
	FAQ: 'faq',
	SCREENSHOTS: 'screenshots',
	ARTS: 'arts',
	MEMS: 'mems',
	RANDOMGG: 'randomgg',
	GAMEPROFILE: 'gameprofile',
	OFFLINE: 'offline',
}

const STORAGE_KEYS = {
	STATUS: 'status',
}

smoothscroll.polyfill();

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePanel: ROUTES.HOME,
			user: null,
			popout: <ScreenSpinner size='large' />,
			snackbar: null,
			arcades: null,
			history: ['home'],
			subscribed: null,
			// scroll[0] - home screen, news tab | scroll[1] - home screen, arcades tab
			scrolls: [
				{scroll: 0},
				{scroll: 0},
			],
			arcadesHistory: {
				img1: null,
				img2: null,
				img3: null,
			},
		};
		this.go = this.go.bind(this);
		this.goBack = this.goBack.bind(this);
		this.viewIntro = this.viewIntro.bind(this);
		this.AndroidBackButton = this.AndroidBackButton.bind(this);
		this.saveScroll = this.saveScroll.bind(this);
		this.getScroll = this.getScroll.bind(this);
		this.clickOnLink = this.clickOnLink.bind(this);
	}

	componentDidMount() {

		var getParams = queryString.parse(window.location.search);

		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});

		bridge.send('VKWebAppGetUserInfo').then(data => {
			this.setState({user: data});
			if (getParams.vk_user_id == data.id) {
				try	{
					fetch('https://cloud.irbot.net/ow_arcade/api2?act=startapp&' + window.location.href.slice(window.location.href.indexOf('?') + 1))
						.then(response => response.json())
						.then(data => {
							let arcades = [];
							data.result.arcades.map(el => {
								arcades.push(<ContentCard
									image={el.img}
									subtitle={"Аркада #" + el.id}
									header={el.name}
									caption={null}
									disabled
									key={el.id}
									style={{ marginBottom: "50px" }}
								/>);
							});
							this.setState({arcades: arcades, subscribed: data.result.subscribed, popout: null, arcadesHistory: {img1: data.result.post0, img2: data.result.post1, img3: data.result.post2}});
						});
					} catch(err) {
						this.setState({
							snackbar: <Snackbar
								layout='vertical'
								onClose={() => this.setState({snackbar: null})}
								before={<Avatar src={OverwatchDailyArcadeIcon} size={32}/>}>
								Не удалось загрузить информацию
							</Snackbar>
						});
					}
			}
		});

		bridge.send('VKWebAppStorageGet', {
			keys: Object.values(STORAGE_KEYS),
		})
		.then(data => {
			if (data.keys[0].value !== 'true') {
				this.setState({activePanel: ROUTES.INTRO});
			}
		})

		window.addEventListener("popstate", this.AndroidBackButton);

		window.addEventListener('offline', () => {
			bridge.send('VKWebAppDisableSwipeBack');
			this.setState({activePanel: ROUTES.OFFLINE, history: ['home']});
		});
		
		window.addEventListener('online', () => {
			this.setState({activePanel: ROUTES.HOME, history: ['home'], snackbar: <Snackbar
					layout='vertical'
					onClose={() => this.setState({snackbar: null})}
					before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}>
					Соединение восстановлено
				</Snackbar>});
		});

	}

	viewIntro() {
		try {
			bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.STATUS,
				value: "true",
			});
			this.setState({activePanel: ROUTES.HOME});
		} catch(error) {
			this.setState({snackbar: <Snackbar
				layout='vertical'
				onClose={() => this.setState({snackbar: null})}
				before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}>
				Упс, что-то пошло не так...
			</Snackbar>})
		}

	}

	go(e) {
		const history = [...this.state.history];
		history.push(e.currentTarget.dataset.to);
		if (e.currentTarget.dataset.to === 'home') {
			bridge.send('VKWebAppDisableSwipeBack');
			this.setState({ history: ['home'], activePanel: e.currentTarget.dataset.to });
		} else {
			this.setState({ history: history, activePanel: e.currentTarget.dataset.to });
		}
		document.body.style.overflow = "visible";

		fetch('https://cloud.irbot.net/ow_arcade/api2?act=verify&' + window.location.href.slice(window.location.href.indexOf('?') + 1))
			.then(response => response.json())
			.then(data => {
				if (data.result !== 'ok') {
					this.setState({activePanel: ROUTES.HOME, subscribed: null, snackbar: <Snackbar
							layout='vertical'
							onClose={() => this.setState({snackbar: null})}>
							Упс, что-то пошло не так...
						</Snackbar>});
				}
			})
			.catch(() => {
				this.setState({activePanel: ROUTES.HOME, subscribed: null, snackbar: <Snackbar
						layout='vertical'
						onClose={() => this.setState({snackbar: null})}>
						Упс, что-то пошло не так...
					</Snackbar>});
			});
	};

	goBack = () => {
		const history = [...this.state.history];
		history.pop();
		const activePanel = history[history.length - 1];
		if (activePanel === 'home') {
		  bridge.send('VKWebAppEnableSwipeBack');
		}
		document.body.style.overflow = "visible";
		this.setState({ history: history, activePanel });
	}
	
	AndroidBackButton = () => {
		if (this.state.activePanel !== ROUTES.HOME && this.state.activePanel !== ROUTES.INTRO) {
			this.goBack();
		} else {
			bridge.send("VKWebAppClose", {"status": "success"});
		}
	}

	saveScroll(id, scroll) {
		this.state.scrolls[id].scroll = scroll;
	}

	getScroll(id) {
		return this.state.scrolls[id].scroll;
	}

	clickOnLink() {
		document.body.style.pointerEvents = "none";
		setTimeout(() => {document.body.style.pointerEvents = "all";}, 1000);
	}

	render() {
		history.pushState(null, null);
		return (
			<ConfigProvider isWebView={true}>
					<View activePanel={this.state.activePanel} popout={this.state.popout} onSwipeBack={this.goBack} history={this.state.history}>
						<Home id={ROUTES.HOME} go={this.go} subscribed={this.state.subscribed} clickOnLink={this.clickOnLink} arcadesHistory={this.state.arcadesHistory} saveScroll={this.saveScroll} getScroll={this.getScroll} arcades={this.state.arcades} user={this.state.user} snackbarError={this.state.snackbar} />
						<Intro id={ROUTES.INTRO} go={this.viewIntro} user={this.state.user} snackbarError={this.state.snackbar} />
						<Update id={ROUTES.UPDATE} go={this.go} clickOnLink={this.clickOnLink}  />
						<FAQ id={ROUTES.FAQ} go={this.go} clickOnLink={this.clickOnLink}  />
						<Screenshots id={ROUTES.SCREENSHOTS} go={this.go} clickOnLink={this.clickOnLink} />
						<Arts id={ROUTES.ARTS} go={this.go} clickOnLink={this.clickOnLink} />
						<Mems id={ROUTES.MEMS} go={this.go} clickOnLink={this.clickOnLink} />
						<Randomgg id={ROUTES.RANDOMGG} go={this.go} />
						<Gameprofile id={ROUTES.GAMEPROFILE} go={this.go} user={this.state.user} />
						<Offline id={ROUTES.OFFLINE} go={this.go} />
					</View>
			</ConfigProvider>
		);
	}

}

export default App;