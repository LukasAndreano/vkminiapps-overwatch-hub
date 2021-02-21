import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import crypto from 'crypto';
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

class Screenshots extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
		snackbar: null,
		spinner: true,
		contextOpened: false,
		mode: 'tab1',
		groups: [
			{
				id: '166328226',
				name: 'Скриншоты Мерки | Mercy Overwatch',
				rows: [],
			},
			{
				id: '194929460',
				name: 'Скриншоты Симметры | Symmetra Overwatch',
				rows: [],
			},
		],
      }
	  this.toggleContext = this.toggleContext.bind(this);
	  this.select = this.select.bind(this);
    }
	toggleContext () {
		if (this.state.contextOpened === false)
			document.body.style.overflow = "hidden";
		else 
			document.body.style.overflow = "visible";
		this.setState({ contextOpened: !this.state.contextOpened });
	}
	select (e) {
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		const mode = e.currentTarget.dataset.mode;
		this.setState({ mode });
		requestAnimationFrame(this.toggleContext);
	}	
	componentDidMount() {
		for	(let b = 0; b < this.state.groups.length; b++) {
			bridge.send("VKWebAppCallAPIMethod", {"method": "wall.get", "params": {"owner_id": "-" + this.state.groups[b].id, "count": 30, "offset": 1, "v":"5.130", "access_token":"6e1c099a6e1c099a6e1c099a0d6e69de1166e1c6e1c099a31e5668f51c802fa62b5057e"}})
			.then(data => {
					let rows = [];
					for (var i = 0; i < 30; i++) {
						try	{
							if (data.response.items[i].marked_as_ads == 0 && data.response.items[i].attachments[0].photo && data.response.items[i].attachments[0].photo.sizes.pop().width > 200 && typeof data.response.items[i].attachments[0].photo.sizes.pop().url !== 'undefined') {
								rows.push(<a rel="noopener noreferrer" target="_blank" href={"https://vk.com/club" + this.state.groups[b].id + "?w=wall-" + this.state.groups[b].id + "_" + data.response.items[i].id}>
									<ContentCard
									image={data.response.items[i].attachments[0].photo.sizes.pop().url}
									text={data.response.items[i].text}
									caption={this.state.groups[b].name}
									key={crypto.randomBytes(20).toString('hex')}
									disabled
								/>
								</a>);
								rows.push(
									<Button size="l" key={crypto.randomBytes(20).toString('hex')} rel="noopener noreferrer" target = "_blank" style={{ marginTop: '10px', marginBottom: '20px' }} stretched mode="secondary" href={"https://vk.com/club" + this.state.groups[b].id + "?w=wall-" + this.state.groups[b].id + "_" + data.response.items[i].id}>Перейти к публикации</Button>
								);
							}
						} catch (err) {
							console.log(err);
						}
					}
					this.state.groups[b].rows = rows;
					this.setState(this.state.groups[b].rows);
			})
			.catch(err => {
				this.setState({snackbar:
					<Snackbar
						onClose={() => this.setState({ snackbar: null })}
					>
						Не удалось загрузить данные
					</Snackbar>
				});
			});
		}
		setTimeout(() => {this.setState({ spinner: false });}, 500);
	}
	componentWillUnmount() {
		for	(let b = 0; b < this.state.groups.length; b++) {
			this.state.groups[b].rows = null;
			this.setState(this.state.groups[b].rows);
		}
	}
	render() {
		let {id, go} = this.props;
		return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>} >
				<PanelHeaderContent
					aside={<Icon16Dropdown style={{ transform: `rotate(${this.state.contextOpened ? '180deg' : '0'})` }} />}
					onClick={this.toggleContext}
					>
					Скриншоты
				</PanelHeaderContent>
			</PanelHeader>
			<PanelHeaderContext opened={this.state.contextOpened} onClose={this.toggleContext}>
                <List>
                  <Cell
                    after={this.state.mode === 'tab1' ? <Icon24Done fill="var(--accent)" /> : null}
					onClick={this.select}
                    data-mode="tab1"
                  >
                    Ангел
                  </Cell>
                  <Cell
                    after={this.state.mode === 'tab2' ? <Icon24Done fill="var(--accent)" /> : null}
                    onClick={this.select}
                    data-mode="tab2"
                  >
                    Симметра
                  </Cell>
                </List>
              </PanelHeaderContext>
			{this.state.spinner === true && <ScreenSpinner size='large' />}
			{this.state.spinner === false &&
			<Group>
				<CardGrid size="l">
					{this.state.mode === 'tab1' && this.state.groups[0].rows}
					{this.state.mode === 'tab2' && this.state.groups[1].rows}
				</CardGrid>
			</Group>
			}
          	{this.state.snackbar}
		</Panel>
		)
	}
}

export default Screenshots;