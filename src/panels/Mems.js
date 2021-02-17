import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import crypto from 'crypto';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Group,
	ContentCard,
	Div,
	Button,
	CardGrid,
	Tabs,
	HorizontalScroll,
	TabsItem,
	Snackbar,
	Avatar,
	ScreenSpinner,
} from '@vkontakte/vkui';

import OverwatchDailyArcadeIcon from '../img/ow_arcade.jpg';

class Mems extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
		snackbar: null,
		spinner: true,
		groups: [
			{
				id: '59381513',
				name: 'IRMAN',
				rows: [],
			},
			{
				id: '194949226',
				name: 'Jaristo Squad | Overwatch',
				rows: [],
			},
		],
        activeTab: 'tab1',
      }
      this.OpenPost = this.OpenPost.bind(this);
    }
    OpenPost() {
    	bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
		this.setState({snackbar:
			<Snackbar
			    onClose={() => this.setState({ snackbar: null })}
			    before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}
			>
			    Открываем публикацию...
			</Snackbar>
		});
	}
	componentDidMount() {
		for	(let b = 0; b < this.state.groups.length; b++) {
			bridge.send("VKWebAppCallAPIMethod", {"method": "wall.get", "params": {"owner_id": "-" + this.state.groups[b].id, "count": 30, "offset": 1, "v":"5.130", "access_token":"6e1c099a6e1c099a6e1c099a0d6e69de1166e1c6e1c099a31e5668f51c802fa62b5057e"}})
			.then(data => {
					let rows = [];
					for (var i = 0; i < 30; i++) {
						try	{
							if (data.response.items[i].marked_as_ads == 0 && data.response.items[i].attachments[0].photo) {
								if (this.state.groups[b].id == '194949226') {
									if (data.response.items[i].text.search('#overwatch_memes@jaristo_squad') !== -1) {
										rows.push(<ContentCard
											image={data.response.items[i].attachments[0].photo.sizes.pop().url}
											text={data.response.items[i].text}
											caption={this.state.groups[b].name}
											key={crypto.randomBytes(20).toString('hex')}
											disabled
										/>);
										rows.push(
											<Button size="l" key={crypto.randomBytes(20).toString('hex')} onClick={this.OpenPost} style={{ marginTop: '10px', marginBottom: '20px' }} stretched mode="secondary" href={"https://vk.com/club" + this.state.groups[b].id + "?w=wall-" + this.state.groups[b].id + "_" + data.response.items[i].id}>Перейти к публикации</Button>
										);
									}
								} else {
									rows.push(<ContentCard
										image={data.response.items[i].attachments[0].photo.sizes.pop().url}
										text={data.response.items[i].text}
										caption={this.state.groups[b].name}
										key={crypto.randomBytes(20).toString('hex')}
										disabled
									/>);
									rows.push(
										<Button size="l" key={crypto.randomBytes(20).toString('hex')} onClick={this.OpenPost} style={{ marginTop: '10px', marginBottom: '20px' }} stretched mode="secondary" href={"https://vk.com/club" + this.state.groups[b].id + "?w=wall-" + this.state.groups[b].id + "_" + data.response.items[i].id}>Перейти к публикации</Button>
									);
								}
							}
						} catch (err) {
							console.log(err);
						}
					}
					this.state.groups[b].rows = rows;
					this.setState(this.state.groups[b].rows);
			});
		}
		this.setState({ spinner: false });
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
				Мемы
			</PanelHeader>
			{this.state.spinner === true && <ScreenSpinner size='large' />}
	            <Tabs>
	                <HorizontalScroll>
	                  <TabsItem onClick={() => this.setState({activeTab: 'tab1'})} selected={this.state.activeTab === 'tab1'}>
	                    Irman
	                  </TabsItem>
	                  <TabsItem onClick={() => this.setState({activeTab: 'tab2'})} selected={this.state.activeTab === 'tab2'}>
	                    Jaristo Squad
	                  </TabsItem>
	                </HorizontalScroll>
	            </Tabs>
			<Group>
			<CardGrid size="l">
				{this.state.activeTab === 'tab1' && this.state.groups[0].rows}
				{this.state.activeTab === 'tab2' && this.state.groups[1].rows}
			</CardGrid>
			</Group>
          	{this.state.snackbar}
		</Panel>
		)
	}
}

export default Mems;