import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import smoothscroll from 'smoothscroll-polyfill';
import crypto from 'crypto';
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
import Weeklyskin from './panels/Weeklyskin';
import Randomgg from './panels/Randomgg';

const ROUTES = {
	HOME: 'home',
	INTRO: 'intro',
	UPDATE: 'update',
	FAQ: 'faq',
	SCREENSHOTS: 'screenshots',
	ARTS: 'arts',
	MEMS: 'mems',
	WEEKLYSKIN: 'weeklyskin',
	RANDOMGG: 'randomgg',
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
	}

	componentDidMount() {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});

		bridge.send('VKWebAppGetUserInfo').then(data => { this.setState({user: data}); });

		bridge.send('VKWebAppStorageGet', {
			keys: Object.values(STORAGE_KEYS),
		})
		.then(data => {
			if (JSON.parse(data.keys[0].value) !== true) {
				this.setState({activePanel: ROUTES.INTRO});
			}
		});

		try	{
			fetch('https://cloud.irbot.net/ow_arcade/api?act=arcades&key=atQ9fP8qbNZUZ5Qm')
			.then(response => response.json())
			.then(data => {
				let arcades = [];
				for (let b = 0; b < 3; b++) {
					let caption = null;
					arcades.push(<ContentCard
						image={data.result.arcades[b].img}
						subtitle={"Аркада #" + (b+1)}
						header={data.result.arcades[b].name}
						caption={caption}
						disabled
						key={crypto.randomBytes(20).toString('hex')}
						style={{ marginBottom: "50px" }}
					/>);
				}
			this.setState({arcades: arcades, popout: null});
		});	
		} catch(err) {
			this.setState({snackbar: <Snackbar
				layout='vertical'
				onClose={() => this.setState({snackbar: null})}
				before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}>
				Не удалось загрузить список аркад
			</Snackbar>})
		}

		try	{
			fetch('https://cloud.irbot.net/ow_arcade/api?act=getPosts&key=atQ9fP8qbNZUZ5Qm')
			.then(response => response.json())
			.then(data => {
				this.setState({arcadesHistory: {img1: data.result.post0, img2: data.result.post1, img3: data.result.post2}});
			});	
		} catch(err) {
			this.setState({snackbar: <Snackbar
				layout='vertical'
				onClose={() => this.setState({snackbar: null})}
				before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}>
				Не удалось загрузить историю аркад
			</Snackbar>})
		}

		window.addEventListener("popstate", this.AndroidBackButton);

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

	render() {
		history.pushState(null, null);
		return (
			<ConfigProvider isWebView={true}>
				<View activePanel={this.state.activePanel} popout={this.state.popout} onSwipeBack={this.goBack} history={this.state.history}>
					<Home id={ROUTES.HOME} go={this.go} arcadesHistory={this.state.arcadesHistory} saveScroll={this.saveScroll} getScroll={this.getScroll} arcades={this.state.arcades} user={this.state.user} snackbarError={this.state.snackbar} />
					<Intro id={ROUTES.INTRO} go={this.viewIntro} user={this.state.user} snackbarError={this.state.snackbar} />
					<Update id={ROUTES.UPDATE} go={this.go} />
					<FAQ id={ROUTES.FAQ} go={this.go} />
					<Screenshots id={ROUTES.SCREENSHOTS} go={this.go} />
					<Arts id={ROUTES.ARTS} go={this.go} />
					<Mems id={ROUTES.MEMS} go={this.go} />
					<Weeklyskin id={ROUTES.WEEKLYSKIN} go={this.go} />
					<Randomgg id={ROUTES.RANDOMGG} go={this.go} />
				</View>
			</ConfigProvider>
		);
	}

}

export default App;