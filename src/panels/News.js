import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import crypto from 'crypto';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Group,
	ContentCard,
	Div,
	Card,
	Title,
	Text,
	Button,
	CardGrid,
	Snackbar,
	Avatar,
	ScreenSpinner
} from '@vkontakte/vkui';

import OverwatchDailyArcadeIcon from '../img/ow_arcade.jpg';

class News extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
		snackbar: null,
		spinner: true,
		groups: [
			{
				id: '140691640',
				name: 'Overwatch School',
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
			bridge.send("VKWebAppCallAPIMethod", {"method": "wall.get", "params": {"owner_id": "-" + this.state.groups[b].id, "count": 100, "offset": 1, "v":"5.130", "access_token":"6e1c099a6e1c099a6e1c099a0d6e69de1166e1c6e1c099a31e5668f51c802fa62b5057e"}})
			.then(data => {
					let rows = [];
					for (var i = 0; i < 100; i++) {
						try {
							if (data.response.items[i].marked_as_ads == 0 && data.response.items[i].attachments[0].photo && data.response.items[i].text.search('#news@overwatchschool') !== -1) {
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
						} catch (err) {
							console.log(err);
						}
					}
					this.state.groups[b].rows = rows;
					this.setState(this.state.groups[b].rows);
			});
		}
		if (this.state.rows != null) {
			this.setState({ spinner: false });
		}
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
				Новости
			</PanelHeader>
			<Div>
				<Card>
					<Div>
						<Title level="2" weight="heavy" style={{ marginBottom: 10 }}>Как работает этот раздел?</Title>
						<Text weight="regular">В данный момент этот раздел отображает публикации только с одной группы. Все публикации, которые помечены как "новости", собраны здесь. Благодарим Overwatch School за этот контент.</Text>
					</Div>
				</Card>	
			</Div>
			<Group>
				<CardGrid size="l">
					{this.state.activeTab === 'tab1' && this.state.groups[0].rows}
				</CardGrid>
			</Group>
			{this.state.spinner === true && <ScreenSpinner size='large' />}
          	{this.state.snackbar}
		</Panel>
		)
	}
}

export default News;