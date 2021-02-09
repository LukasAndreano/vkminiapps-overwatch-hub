import React, { Fragment } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	PanelHeader,
	Panel,
	Group,
	Div,
	Avatar,
	Title,
	Text,
	Button,
} from '@vkontakte/vkui';

import OverwatchDailyArcadeIcon from '../img/ow_arcade.jpg';
import '../css/Intro.css';

const Intro = ({id, snackbarError, user, userHasSeenIntro, go}) => {
	return (
		<Panel id={id} centered={true}>
			<PanelHeader>
				OW HUB
			</PanelHeader>
			{(!userHasSeenIntro && user) && 
				<Fragment>
					<Group>
						<Div className="WelcomeBlock">
							<Avatar src={OverwatchDailyArcadeIcon} size={64} />
							<Title level="1" weight="bold" style={{ marginBottom: 16 }}>Добро пожаловать в Overwatch Hub, {user.first_name}!</Title>
							<Text weight="regular">Благодаря этому приложению ты в любой момент времени можешь узнать актуальный список аркад, посмотреть мемчики, арты, скриншотики со своим любимым персонажем, а также узнать новости из вселенной Overwatch.</Text>
							<Button size="l" stretched mode="secondary" onClick={go}>Окей, понятно!</Button>
						</Div>
					</Group>
				</Fragment>
			}
			{snackbarError}
		</Panel>
	)
}

export default Intro;