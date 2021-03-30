import React, { Fragment } from 'react';
import {
	Panel,
	Group,
	Div,
	Title,
	Text,
	Button,
	Avatar,
} from '@vkontakte/vkui';

import {
	Icon36DoneOutline,
	Icon36CancelOutline
} from '@vkontakte/icons';

import '../css/Intro.css';

const Textpage = ({id, go, title, text, link, button, success}) => {
	return (
		<Panel id={id} centered={true}>
				<Fragment>
					<Group>
						<Div className="WelcomeBlock">
							{success && <Avatar size={64}><Icon36DoneOutline/></Avatar>}
							{!success && <Avatar size={64}><Icon36CancelOutline/></Avatar>}
							<Title level="1" weight="bold" style={{ marginBottom: 16 }}>{title}</Title>
							<Text weight="regular">{text}</Text>
							<Button size="l" stretched mode="secondary" onClick={() => {go(link)}}>{button}</Button>
						</Div>
					</Group>
				</Fragment>
		</Panel>
	)
}

export default Textpage;