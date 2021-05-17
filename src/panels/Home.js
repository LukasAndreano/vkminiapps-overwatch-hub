import React from "react";
import bridge from "@vkontakte/vk-bridge";
import {
	Group,
	Header,
	PanelHeader,
	Panel,
	SimpleCell,
	Switch,
	Card,
	Div,
	Title,
	Text,
	CardScroll,
	PanelHeaderButton,
	ContentCard,
	Button,
	Tabbar,
	TabbarItem,
	CardGrid,
	Epic,
} from "@vkontakte/vkui";
import {
	Icon28Notifications,
	Icon28CubeBoxOutline,
	Icon28NewsfeedOutline,
	Icon28HelpCircleOutline,
	Icon28FaceRecognitionOutline,
	Icon28PictureStackOutline,
	Icon28MasksOutline,
	Icon28SparkleOutline,
	Icon28AllCategoriesOutline,
	Icon28GameOutline,
	Icon28Profile,
	Icon28SearchLikeOutline,
} from "@vkontakte/icons";

import fetch2 from "../components/Fetch";

/*eslint react/no-direct-mutation-state: "off"*/
/*eslint eqeqeq: "off"*/

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			arcades: [],
			subscribed: false,
			alert: null,
			changed: false,
			activeStory: "menu",
			groups: [
				{
					id: "140691640",
					name: "Overwatch School",
					rows: [],
				},
			],
		};
		this.openPage = this.openPage.bind(this);
		this.openImage = this.openImage.bind(this);
	}

	openImage(imgURL) {
		bridge.send("VKWebAppShowImages", { images: [imgURL] });
	}

	componentDidUpdate() {
		if (this.state.changed === true) {
			if (this.state.subscribed === true) {
				this.setState({
					changed: false,
					alert: (
						<SimpleCell
							disabled
							onChange={() => {
								this.props.clickOnLink();
								this.changeSubscribe(true);
							}}
							before={<Icon28Notifications />}
							after={<Switch defaultChecked />}
						>
							Рассылка с аркадами
						</SimpleCell>
					),
				});
			} else {
				this.setState({
					changed: false,
					alert: (
						<SimpleCell
							disabled
							onChange={() => {
								this.props.clickOnLink();
								this.changeSubscribe(false);
							}}
							before={<Icon28Notifications />}
							after={<Switch />}
						>
							Рассылка с аркадами
						</SimpleCell>
					),
				});
			}
		}
	}

	componentDidMount() {
		fetch2("loadWall", "page=news").then((data) => {
			let rows = [];
			try {
				for (let i = 0; i < data.result.length; i++) {
					data.result[i].forEach((el) => {
						for (
							let c = 0;
							c < el.attachments[0].photo.sizes.length;
							c++
						) {
							if (el.attachments[0].photo.sizes[c].width >= 250) {
								var img = el.attachments[0].photo.sizes[c].url;
							}
						}
						rows.push(
							<div key={el.id} className="content">
								<a
									onClick={this.props.clickOnLink}
									className="content"
									rel="noopener noreferrer"
									target="_blank"
									href={
										"https://vk.com/public" +
										this.state.groups[i].id +
										"?w=wall-" +
										this.state.groups[i].id +
										"_" +
										el.id
									}
								>
									<ContentCard
										onError={(e) => {
											e.target.style.display = "none";
											this.props.setSnackbar(
												"Произошла ошибка при загрузке картинки в ленте. Повторите запрос позже.",
												2000
											);
										}}
										image={img}
										text={el.text}
										caption={this.state.groups[i].name}
										disabled
									/>
								</a>
								<Button
									onClick={this.props.clickOnLink}
									className="content"
									size="l"
									rel="noopener noreferrer"
									target="_blank"
									style={{
										marginTop: "10px",
										marginBottom: "20px",
									}}
									stretched
									mode="secondary"
									href={
										"https://vk.com/public" +
										this.state.groups[i].id +
										"?w=wall-" +
										this.state.groups[i].id +
										"_" +
										el.id
									}
								>
									Перейти к публикации
								</Button>
							</div>
						);
					});
					this.state.groups[i].rows = rows;
					this.setState(this.state.groups[i].rows);
				}
			} catch (err) {
				this.props.setSnackbar(
					"Не удалось загрузить ленту новостей",
					2000
				);
			}
		});
		setTimeout(() => {
			if (this.props.subscribed === true) {
				this.setState({
					alert: (
						<SimpleCell
							disabled
							onChange={() => {
								this.props.clickOnLink();
								this.changeSubscribe(true);
							}}
							before={<Icon28Notifications />}
							after={<Switch defaultChecked />}
						>
							Рассылка с аркадами
						</SimpleCell>
					),
				});
			} else {
				this.setState({
					alert: (
						<SimpleCell
							disabled
							onChange={() => {
								this.props.clickOnLink();
								this.changeSubscribe(false);
							}}
							before={<Icon28Notifications />}
							after={<Switch />}
						>
							Рассылка с аркадами
						</SimpleCell>
					),
				});
			}
		}, 1200);
	}

	componentWillUnmount() {
		for (let b = 0; b < this.state.groups.length; b++) {
			this.state.groups[b].rows = null;
			this.setState(this.state.groups[b].rows);
		}
	}

	changeSubscribe(subscribed) {
		if (subscribed == true) {
			fetch2("unsubscribe").then(() => {
				this.props.tapticEngine();
				this.props.setSnackbar("Рассылка отключена 😔", 2000);
				this.setState({
					subscribed: false,
					changed: true,
				});
			});
		} else {
			bridge
				.send("VKWebAppAllowMessagesFromGroup", { group_id: 197332265 })
				.then(() => {
					fetch2("subscribe").then(() => {
						this.props.tapticEngine();
						this.setState({
							subscribed: true,
							changed: true,
						});
						this.props.setSnackbar(
							"Рассылка активирована 🥳",
							2000
						);
					});
				})
				.catch(() => {
					this.props.tapticEngine("error");
					this.setState({
						subscribed: false,
						changed: true,
						alert: false,
					});
					this.props.setSnackbar(
						"Подписка на рассылку отменена",
						2000
					);
				});
		}
	}

	openPage(e) {
		let scroll;
		switch (this.state.activeStory) {
			case "feed":
				this.props.saveScroll(0, window.scrollY);
				break;
			case "arcades":
				this.props.saveScroll(1, window.scrollY);
				break;
			default:
				this.props.saveScroll(0, window.scrollY);
				break;
		}
		switch (e.currentTarget.dataset.story) {
			case "feed":
				scroll = this.props.getScroll(0);
				if (scroll !== 0)
					setTimeout(() => {
						window.scroll({
							top: scroll,
							left: 0,
							behavior: "smooth",
						});
					}, 100);
				break;
			case "arcades":
				scroll = this.props.getScroll(1);
				if (scroll !== 0)
					setTimeout(() => {
						window.scroll({
							top: scroll,
							left: 0,
							behavior: "smooth",
						});
					}, 100);
				break;
			default:
				scroll = 0
				break;
		}
		this.setState({ activeStory: e.currentTarget.dataset.story });
	}

	render() {
		let { id, go, snackbar } = this.props;
		return (
			<Panel id={id} className="homePage">
				<Epic
					activeStory={this.state.activeStory}
					tabbar={
						<Tabbar>
							<TabbarItem
								selected={this.state.activeStory === "feed"}
								data-story="feed"
								onClick={this.openPage}
								text="Новости"
							>
								<Icon28NewsfeedOutline />
							</TabbarItem>
							<TabbarItem
								selected={this.state.activeStory === "menu"}
								data-story="menu"
								onClick={this.openPage}
								text="Меню"
							>
								<Icon28AllCategoriesOutline />
							</TabbarItem>
							<TabbarItem
								selected={this.state.activeStory === "arcades"}
								data-story="arcades"
								onClick={this.openPage}
								text="Аркады"
							>
								<Icon28GameOutline />
							</TabbarItem>
						</Tabbar>
					}
				>
					<Panel id="feed" activeStory="feed">
						<PanelHeader separator={false}>Новости</PanelHeader>
						<Group>
							<CardGrid size="l">
								{this.state.groups[0].rows}
							</CardGrid>
						</Group>
					</Panel>
					<Panel id="menu" activeStory="menu">
						<PanelHeader
							separator={false}
							left={
								<PanelHeaderButton onClick={() => go("faq")}>
									<Icon28HelpCircleOutline />
								</PanelHeaderButton>
							}
						>
							Главная
						</PanelHeader>
						<Group>
							<SimpleCell
								onClick={() => go("gameprofile")}
								expandable
								before={<Icon28Profile />}
							>
								Игровой профиль
							</SimpleCell>
							<SimpleCell
								onClick={() => go("findteammate")}
								expandable
								before={<Icon28SearchLikeOutline />}
							>
								Поиск напарника <span className="new">NEW</span>
							</SimpleCell>
							<SimpleCell
								onClick={() => go("update")}
								expandable
								before={<Icon28CubeBoxOutline />}
							>
								Архивы
							</SimpleCell>
							<SimpleCell
								onClick={() => go("mems")}
								expandable
								before={<Icon28MasksOutline />}
							>
								Мемы
							</SimpleCell>
							<SimpleCell
								onClick={() => go("screenshots")}
								expandable
								before={<Icon28FaceRecognitionOutline />}
							>
								Скриншоты персонажей
							</SimpleCell>
							<SimpleCell
								onClick={() => go("arts")}
								expandable
								before={<Icon28PictureStackOutline />}
							>
								Арты
							</SimpleCell>
							<SimpleCell
								onClick={() => go("randomgg")}
								expandable
								before={<Icon28SparkleOutline />}
							>
								Случайный голдган
							</SimpleCell>
						</Group>
					</Panel>
					<Panel id="arcades" activeStory="arcades">
						<PanelHeader separator={false}>Аркады</PanelHeader>
						<Group
							header={
								<Header mode="secondary">
									СПИСОК АРКАД НА СЕГОДНЯ
								</Header>
							}
						>
							<CardScroll
								size="s"
								style={{ marginBottom: "-50px" }}
							>
								{this.props.arcades}
							</CardScroll>
						</Group>
						<Group
							header={
								<Header mode="secondary">
									ИСТОРИЯ АРКАД ЗА ПОСЛЕДНИЕ 3 ДНЯ
								</Header>
							}
						>
							<CardScroll
								size="m"
								style={{ marginBottom: "-50px" }}
							>
								<ContentCard
									image={this.props.arcadesHistory.img1}
									disabled
									style={{ marginBottom: "50px" }}
									onClick={() => {
										this.openImage(
											this.props.arcadesHistory.img1
										);
									}}
									header="Аркады сегодня"
								/>
								<ContentCard
									image={this.props.arcadesHistory.img2}
									disabled
									style={{ marginBottom: "50px" }}
									onClick={() => {
										this.openImage(
											this.props.arcadesHistory.img2
										);
									}}
									header="Аркады вчера"
								/>
								<ContentCard
									image={this.props.arcadesHistory.img3}
									disabled
									style={{ marginBottom: "50px" }}
									onClick={() => {
										this.openImage(
											this.props.arcadesHistory.img3
										);
									}}
									header="Аркады позавчера"
								/>
							</CardScroll>
						</Group>
						<Div>
							<Card>
								<Div>
									<Text weight="regular">
										История аркад обновляется ежедневно в
										07:00 по МСК.
									</Text>
								</Div>
							</Card>
						</Div>
						<Div>
							<Card>
								<Div>{this.state.alert}</Div>
							</Card>
						</Div>
						<Div>
							<Card>
								<Div>
									<Title
										level="2"
										weight="heavy"
										style={{ marginBottom: 10 }}
									>
										Где, допустим, аркады за прошлый месяц?
									</Title>
									<Text weight="regular">
										Здесь отображены аркады за последние 3
										дня, включая сегодняший. Чтобы
										посмотреть аркады за всё время работы
										Overwatch Daily Arcade, нажмите на
										соответствующую кнопку ниже. Кнопка
										перенаправит Вас на наше официальное
										сообщество.
									</Text>
								</Div>
							</Card>
						</Div>
						<Div>
							<Button
								size="l"
								stretched
								mode="secondary"
								target="_blank"
								href="https://vk.com/ow.arcade"
							>
								Перейти в сообщество
							</Button>
						</Div>
					</Panel>
				</Epic>
				{snackbar}
			</Panel>
		);
	}
}

export default Home;
