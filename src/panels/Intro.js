import React, { Fragment } from "react";
import Confetti from "react-confetti";
import {
	Panel,
	Group,
	Div,
	Avatar,
	Title,
	Text,
	Button,
} from "@vkontakte/vkui";

import OverwatchDailyArcadeIcon from "../img/ow_arcade.jpg";
import "../css/Intro.css";

const Intro = ({ id, snackbar, user, userHasSeenIntro, go }) => {
	return (
		<Panel id={id} centered={true}>
			{!userHasSeenIntro && user && (
				<Fragment>
					<Group>
						<Confetti
							width={window.innerWidth}
							height={window.innerHeight}
							numberOfPieces={25}
						/>
						<Div className="WelcomeBlock">
							<Avatar src={OverwatchDailyArcadeIcon} size={64} />
							<Title
								level="1"
								weight="bold"
								style={{ marginBottom: 16 }}
							>
								Добро пожаловать в Overwatch Hub,{" "}
								{user.first_name}!
							</Title>
							<Text weight="regular">
								Благодаря этому приложению ты в любой момент
								времени можешь узнать актуальный список аркад,
								посмотреть мемчики, арты, скриншотики со своим
								любимым персонажем, а также узнать новости из
								вселенной Overwatch.
							</Text>
							<Button
								size="l"
								stretched
								mode="secondary"
								onClick={go}
							>
								Окей, понятно!
							</Button>
						</Div>
					</Group>
				</Fragment>
			)}
			{snackbar}
		</Panel>
	);
};

export default Intro;
