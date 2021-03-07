import React, { Fragment } from 'react';
import {
	Panel,
	Group,
	Div,
	Avatar,
	Title,
	Text,
	Button,
} from '@vkontakte/vkui';

import '../css/Intro.css';

const Offline = ({id, go}) => {
	return (
		<Panel id={id} centered={true}>
				<Fragment>
					<Group>
						<Div className="WelcomeBlock">
							<Title level="1" weight="bold" style={{ marginBottom: 16 }}>Что произошло?!</Title>
							<Text weight="regular">Похоже, ты потерял интернет-соединение, без которого приложение не может работать. Как только всё придёт в норму - мы вернём тебя в главное меню.</Text>
						</Div>
					</Group>
				</Fragment>
		</Panel>
	)
}

export default Offline;