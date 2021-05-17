import React from "react";
import bridge from "@vkontakte/vk-bridge";
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	ContentCard,
	Snackbar,
	Div,
	Button,
	CardGrid,
} from "@vkontakte/vkui";

import week3 from "../img/events/week3.webp";

class Weeklyskin extends React.Component {
	constructor(props) {
		super(props);
		this.openImage = this.openImage.bind(this);
	}
	openImage(imgURL) {
		bridge.send("VKWebAppShowImages", { images: [imgURL] });
	}
	render() {
		let { id, go } = this.props;
		return (
			<Panel id={id}>
				<PanelHeader
					separator={false}
					left={<PanelHeaderBack onClick={() => go("home")} />}
				>
					Испытание
				</PanelHeader>
				<CardGrid size="l" style={{ paddingTop: 15 }}>
					<ContentCard
						onError={(e) => {
							e.target.style.display = "none";
							this.setState({
								snackbar: (
									<Snackbar
										onClose={() =>
											this.setState({ snackbar: null })
										}
									>
										Произошла ошибка при загрузке картинки в
										ленте. Повторите запрос позже.
									</Snackbar>
								),
							});
						}}
						image={week3}
						header="Скин на Ангела"
						text="Зарабатывайте звёзды в PvE-миссиях и получайте награды! Для получения эпического облика на Ангела «Камуфляж» необходимо получить 30 звёзд."
						caption="Этот скин невозможно приобрести за монеты."
						maxHeight={200}
						onClick={() => {
							this.props.clinkOnLink();
							this.openImage(
								"https://sun9-55.userapi.com/impg/kKaE4avtqtWMmMYlfCghAc6GE8sVeSV2bnwi5A/X-wfzJCY2KI.jpg?size=1280x720&quality=96&sign=5b15c2c9859dfd9fcce9bbbdf361a70d&type=album"
							);
						}}
						disabled
					/>
				</CardGrid>
				<Div>
					<Button
						size="l"
						stretched
						mode="secondary"
						onClick={() => go("home")}
					>
						Назад в меню
					</Button>
				</Div>
			</Panel>
		);
	}
}

export default Weeklyskin;
