import React from "react";
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	PanelHeaderContext,
	PanelHeaderContent,
	Group,
	ContentCard,
	Button,
	CardGrid,
	List,
	Cell,
	ScreenSpinner,
} from "@vkontakte/vkui";

import { Icon16Dropdown, Icon24Done } from "@vkontakte/icons";

import fetch2 from "../components/Fetch";

/*eslint react/no-direct-mutation-state: "off"*/

class Arts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			spinner: true,
			contextOpened: false,
			mode: "tab1",
			groups: [
				{
					id: "172205878",
					name: "SupportPain | Overwatch",
					link: "public",
					rows: [],
				},
				{
					id: "131828014",
					name: "random mercy [overwatch]",
					link: "public",
					rows: [],
				},
				{
					id: "168858951",
					name: "d.va или какая то hana song",
					link: "public",
					rows: [],
				},
				{
					id: "183848219",
					name: "Ковбой Маккри / Jesse McCree Overwatch",
					link: "club",
					rows: [],
				},
				{
					id: "195410833",
					name: "Забегаловка Эш",
					link: "public",
					rows: [],
				},
				{
					id: "187694319",
					name: "Lucio - The Best Frog",
					link: "public",
					rows: [],
				},
			],
		};
		this.toggleContext = this.toggleContext.bind(this);
		this.select = this.select.bind(this);
	}
	toggleContext() {
		if (this.state.contextOpened === false) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}
		this.setState({ contextOpened: !this.state.contextOpened });
	}
	select(e) {
		window.scroll({ top: 0, left: 0, behavior: "smooth" });
		const mode = e.currentTarget.dataset.mode;
		this.setState({ mode, spinner: true });
		setTimeout(() => {
			this.setState({ spinner: false });
		}, 500);
		requestAnimationFrame(this.toggleContext);
	}
	componentDidMount() {
		fetch2("loadWall", "page=arts").then((data) => {
			try {
				for (let i = 0; i < data.result.length; i++) {
					let rows = [];
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
										"https://vk.com/" +
										this.state.groups[i].link +
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
												"Не удалось загрузить ленту 😐",
												2000
											);
										}}
										image={img}
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
										"https://vk.com/" +
										this.state.groups[i].link +
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
				this.setState({ spinner: false });
			} catch (err) {
				this.props.setSnackbar("Не удалось загрузить ленту 😐", 2000);
			}
		});
	}
	componentWillUnmount() {
		for (let b = 0; b < this.state.groups.length; b++) {
			this.state.groups[b].rows = null;
			this.setState(this.state.groups[b].rows);
		}
	}
	render() {
		let { id, go, snackbar } = this.props;
		return (
			<Panel id={id}>
				<PanelHeader
					separator={false}
					left={<PanelHeaderBack onClick={() => go("home")} />}
				>
					<PanelHeaderContent
						aside={
							<Icon16Dropdown
								style={{
									transform: `rotate(${
										this.state.contextOpened
											? "180deg"
											: "0"
									})`,
								}}
							/>
						}
						onClick={this.toggleContext}
					>
						Арты
					</PanelHeaderContent>
				</PanelHeader>
				<PanelHeaderContext
					opened={this.state.contextOpened}
					onClose={this.toggleContext}
				>
					<List>
						<Cell
							after={
								this.state.mode === "tab1" ? (
									<Icon24Done fill="var(--accent)" />
								) : null
							}
							onClick={this.select}
							data-mode="tab1"
						>
							SupportPain
						</Cell>
						<Cell
							after={
								this.state.mode === "tab2" ? (
									<Icon24Done fill="var(--accent)" />
								) : null
							}
							onClick={this.select}
							data-mode="tab2"
						>
							random mercy
						</Cell>
						<Cell
							after={
								this.state.mode === "tab3" ? (
									<Icon24Done fill="var(--accent)" />
								) : null
							}
							onClick={this.select}
							data-mode="tab3"
						>
							D.Va
						</Cell>
						<Cell
							after={
								this.state.mode === "tab4" ? (
									<Icon24Done fill="var(--accent)" />
								) : null
							}
							onClick={this.select}
							data-mode="tab4"
						>
							Ковбой Маккри
						</Cell>
						<Cell
							after={
								this.state.mode === "tab5" ? (
									<Icon24Done fill="var(--accent)" />
								) : null
							}
							onClick={this.select}
							data-mode="tab5"
						>
							Эш
						</Cell>
						<Cell
							after={
								this.state.mode === "tab6" ? (
									<Icon24Done fill="var(--accent)" />
								) : null
							}
							onClick={this.select}
							data-mode="tab6"
						>
							Лусио
						</Cell>
					</List>
				</PanelHeaderContext>
				{this.state.spinner === true && <ScreenSpinner size="large" />}
				{this.state.spinner === false && (
					<Group>
						<CardGrid size="l">
							{this.state.mode === "tab1" &&
								this.state.groups[0].rows}
							{this.state.mode === "tab2" &&
								this.state.groups[1].rows}
							{this.state.mode === "tab3" &&
								this.state.groups[2].rows}
							{this.state.mode === "tab4" &&
								this.state.groups[3].rows}
							{this.state.mode === "tab5" &&
								this.state.groups[4].rows}
							{this.state.mode === "tab6" &&
								this.state.groups[5].rows}
						</CardGrid>
					</Group>
				)}
				{snackbar}
			</Panel>
		);
	}
}

export default Arts;
