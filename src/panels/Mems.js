import React from 'react';
import fetch2 from '../components/Fetch';
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
	Snackbar,
	ScreenSpinner,
} from '@vkontakte/vkui';

import {
	Icon16Dropdown,
	Icon24Done
} from '@vkontakte/icons';

class Mems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			snackbar: null,
			spinner: true,
			contextOpened: false,
			mode: 'tab1',
			groups: [
				{
					id: '59381513',
					name: 'IRMAN',
					rows: [],
				},
				{
					id: '194949226',
					name: 'Jaristo Squad',
					rows: [],
				},
				{
					id: '140691640',
					name: 'Overwatch School',
					rows: [],
				},
			],
		}
		this.toggleContext = this.toggleContext.bind(this);
		this.select = this.select.bind(this);
	}

	toggleContext() {
		if (this.state.contextOpened === false)
			document.body.style.overflow = "hidden";
		else
			document.body.style.overflow = "visible";
		this.setState({contextOpened: !this.state.contextOpened});
	}

	select(e) {
		window.scroll({top: 0, left: 0, behavior: 'smooth'});
		const mode = e.currentTarget.dataset.mode;
		this.setState({ mode, spinner: true });
		setTimeout(() => {
			this.setState({spinner: false})
		}, 500)
		requestAnimationFrame(this.toggleContext);
	}

	componentDidMount() {
		fetch2('loadWall', 'page=mems').then(data => {
			try {
				for (let i = 0; i < data.result.length; i++) {
					let rows = [];
					data.result[i].map(el => {
						for (let c = 0; c < el.attachments[0].photo.sizes.length; c++) {
							if (el.attachments[0].photo.sizes[c].width >= 250) {
								var img = el.attachments[0].photo.sizes[c].url;
							}
						}
						rows.push(<div key={el.id} className="content">
							<a onClick={this.props.clickOnLink} className="content" rel="noopener noreferrer"
							   target="_blank"
							   href={"https://vk.com/public" + this.state.groups[i].id + "?w=wall-" + this.state.groups[i].id + "_" + el.id}>
								<ContentCard
									onError={(e) => {
										e.target.style.display = 'none';
										this.setState({
											snackbar: <Snackbar onClose={() => this.setState({snackbar: null})}>Произошла
												ошибка при загрузке картинки в ленте. Повторите запрос позже.</Snackbar>
										});
									}}
									image={img}
									text={el.text}
									caption={this.state.groups[i].name}
									disabled
								/>
							</a>
							<Button onClick={this.props.clickOnLink} className="content" size="l"
									rel="noopener noreferrer" target="_blank"
									style={{marginTop: '10px', marginBottom: '20px'}} stretched mode="secondary"
									href={"https://vk.com/public" + this.state.groups[i].id + "?w=wall-" + this.state.groups[i].id + "_" + el.id}>Перейти
								к публикации</Button>
						</div>);
					})
					this.state.groups[i].rows = rows;
					this.setState(this.state.groups[i].rows);
				}
				this.setState({spinner: false});
			} catch (err) {
				this.setState({
					snackbar: <Snackbar
						layout='vertical'
						onClose={() => this.setState({snackbar: null})}>
						Не удалось загрузить ленту мемов
					</Snackbar>
				});
			}
		})
	}

	componentWillUnmount() {
		for (let b = 0; b < this.state.groups.length; b++) {
			this.state.groups[b].rows = null;
			this.setState(this.state.groups[b].rows);
		}
	}

	render() {
		let {id, go} = this.props;
		return (
			<Panel id={id}>
				<PanelHeader separator={false} left={<PanelHeaderBack onClick={() => go('home')} />}>
					<PanelHeaderContent
						aside={<Icon16Dropdown
							style={{transform: `rotate(${this.state.contextOpened ? '180deg' : '0'})`}}/>}
						onClick={this.toggleContext}
					>
						Мемы
					</PanelHeaderContent>
				</PanelHeader>
				<PanelHeaderContext opened={this.state.contextOpened} onClose={this.toggleContext}>
					<List>
						<Cell
							after={this.state.mode === 'tab1' ? <Icon24Done fill="var(--accent)"/> : null}
							onClick={this.select}
							data-mode="tab1"
						>
							Irman
						</Cell>
						<Cell
							after={this.state.mode === 'tab2' ? <Icon24Done fill="var(--accent)"/> : null}
							onClick={this.select}
							data-mode="tab2"
						>
							Jaristo Squad
						</Cell>
						<Cell
							after={this.state.mode === 'tab3' ? <Icon24Done fill="var(--accent)"/> : null}
							onClick={this.select}
							data-mode="tab3"
						>
							Overwatch School
						</Cell>
					</List>
				</PanelHeaderContext>
				{this.state.spinner === true && <ScreenSpinner size='large'/>}
				{this.state.spinner === false &&
				<Group>
					<CardGrid size="l">
						{this.state.mode === 'tab1' && this.state.groups[0].rows}
						{this.state.mode === 'tab2' && this.state.groups[1].rows}
						{this.state.mode === 'tab3' && this.state.groups[2].rows}
					</CardGrid>
				</Group>
				}
				{this.state.snackbar}
			</Panel>
		)
	}
}

export default Mems;