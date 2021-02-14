import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import {
	View,
	Snackbar,
	Avatar,
	ScreenSpinner,
} from '@vkontakte/vkui';

const request = require('sync-request');

import OverwatchDailyArcadeIcon from './img/ow_arcade.jpg';

import "./css/Index.css";

import Home from './panels/Home';
import Intro from './panels/Intro';
import Update from './panels/Update';
import FAQ from './panels/FAQ';
import History from './panels/History';
import News from './panels/News';
import Screenshots from './panels/Screenshots';
import Arts from './panels/Arts';
import Mems from './panels/Mems';
import Weeklyskin from './panels/Weeklyskin';

const ROUTES = {
	HOME: 'home',
	INTRO: 'intro',
	UPDATE: 'update',
	FAQ: 'faq',
	HISTORY: 'history',
	NEWS: 'news',
	SCREENSHOTS: 'screenshots',
	ARTS: 'arts',
	MEMS: 'mems',
	WEEKLYSKIN: 'weeklyskin',
	RANDOMGG: 'randomgg',
}

const STORAGE_KEYS = {
	STATUS: 'status',
}

const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.HOME);
	const [user, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);
	const [snackbar, setSnackbar] = useState(false);

	bridge.subscribe(({ detail: { type, data }}) => {
		if (type === 'VKWebAppUpdateConfig') {
			const schemeAttribute = document.createAttribute('scheme');
			schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
			document.body.attributes.setNamedItem(schemeAttribute);
		}
	});

	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const storageData = await bridge.send('VKWebAppStorageGet', {
				keys: Object.values(STORAGE_KEYS),
			});
			const data = {};
			storageData.keys.forEach( ({key,value}) => {
				try {
					data[key] = value ? JSON.parse(value) : {};
					switch (key) {
						case STORAGE_KEYS.STATUS:
							if (data[key].hasSeenIntro) {
								setUserHasSeenIntro(true);
							} else {
								setActivePanel(ROUTES.INTRO);
							}
							break;
						default:
							break;
					}
				} catch(error) {
					setSnackbar(<Snackbar>
						layout='vertical'
						onClose={() => setSnackbar(null)}
						before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}
						Упс, что-то пошло не так...
					</Snackbar>)
				}
			})
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	var result = JSON.parse(request('GET', 'https://cloud.irbot.net/ow_arcade/today').getBody('utf8'));

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	document.addEventListener('DOMContentLoaded', function () {
		window.addEventListener('popstate', function (e) {
            history.pushState(null, null, window.location.pathname);
            setActivePanel(ROUTES.HOME);
        });
        history.pushState(null, null, window.location.pathname);
        setActivePanel(ROUTES.HOME);
    })

	const viewIntro = async function() {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.STATUS,
				value: JSON.stringify({
					hasSeenIntro: true,
				})
			});
			setActivePanel(ROUTES.HOME);
		} catch(error) {
			setSnackbar(<Snackbar>
				layout='vertical'
				onClose={() => setSnackbar(null)}
				before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}
				Упс, что-то пошло не так...
			</Snackbar>)
		}
	}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id={ROUTES.HOME} go={go} user={user} arcades={result} snackbarError={snackbar} />
			<Intro id={ROUTES.INTRO} go={viewIntro} user={user} snackbarError={snackbar} />
			<Update id={ROUTES.UPDATE} go={go} />
			<FAQ id={ROUTES.FAQ} go={go} />
			<History id={ROUTES.HISTORY} go={go} />
			<News id={ROUTES.NEWS} go={go} />
			<Screenshots id={ROUTES.SCREENSHOTS} go={go} />
			<Arts id={ROUTES.ARTS} go={go} />
			<Mems id={ROUTES.MEMS} go={go} />
			<Weeklyskin id={ROUTES.WEEKLYSKIN} go={go} />
		</View>
	);
};

export default App;