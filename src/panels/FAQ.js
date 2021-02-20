import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import {
	Group,
	ContentCard,
	CardGrid,
	Snackbar,
	CellButton,
	Avatar,
	Div,
	Button
} from '@vkontakte/vkui';
import { Icon28AddCircleOutline } from '@vkontakte/icons';
import OverwatchDailyArcadeIcon from '../img/ow_arcade.jpg';

class FAQ extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			snackbar: null,
		};
		this.addtogroup = this.addtogroup.bind(this);
	}
	addtogroup() {
		bridge.send("VKWebAppAddToCommunity")
		.then(data => {
			bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
			this.setState({snackbar:
			    <Snackbar
			      onClose={() => this.setState({ snackbar: null })}
			      before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}
			    >
			    	Приложение установлено!
			    </Snackbar>
			});
		})
		.catch(error => {
			bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"});
			this.setState({snackbar:
			    <Snackbar
			      onClose={() => this.setState({ snackbar: null })}
			      before={<Avatar src={OverwatchDailyArcadeIcon} size={32} />}
			    >
			    	Действие отменено
			    </Snackbar>
			});
		});
	}
	render() {
		let {id, go} = this.props;
		return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>} >
				FAQ
			</PanelHeader>
			<Group>
				<CardGrid size="l">
		            <ContentCard
		              subtitle="СВЯЗЬ С ACTIVISION BLIZZARD"
					  disabled
		              header="Информация про приложение"
		              text="Overwatch Daily Arcade не является официальным приложением и никаким образом не связан с Activision Blizzard."
		              maxheight={200}
		            />
		            <ContentCard
		              subtitle="ИНФОРМАЦИЯ ПРО СПИСОК АРКАД"
					  disabled
		              header="Список аркад"
		              text="Список аркад в приложении обновляется ежедневно в 07:00 по МСК."
		              maxheight={200}
		            />
		            <ContentCard
		              subtitle="ИНФОРМАЦИЯ ПРО ОБНОВЛЕНИЕ"
					  disabled
		              header="Лунный новый год"
		              text="Во вкладке 'Лунный Новый год' перечислены только скины. Граффити, иконки, анимации лучшего момента матча не входят в этот раздел."
		              maxheight={200}
		            />
		            <ContentCard
		              subtitle="ИНФОРМАЦИЯ ПРО РАССЫЛКУ"
					  disabled
		              header="Рассылка"
		              text="При активации функции 'Рассылка с аркадами' мы добавляем ваш аккаунт в список ежедневной автоматизированной рассылки. Чтобы отписаться от нее, переключите тумблер или откройте сообщения с нашим сообществом, где будет кнопка 'Отключить уведомления'."
		              maxheight={200}
		            />
		            <ContentCard
		              subtitle="ИНФОРМАЦИЯ ПРО ПРИЛОЖЕНИЕ"
					  disabled
		              header="Приложение"
		              text="Текущая версия приложения: 1.1.0. Разработчик: Никита Балин"
		              maxheight={200}
		            />
		        </CardGrid>
			    <Div>
			      <Button size="l" stretched mode="secondary" href="https://vk.com/ow.arcade" target = "_blank">Открыть наше сообщество</Button>
			    </Div>
			</Group>
			<CellButton onClick={this.addtogroup} centered before={<Icon28AddCircleOutline />}>Добавить нас к себе в группу</CellButton>
			<Group></Group>
          	{this.state.snackbar}
		</Panel>
		)
	}
}

export default FAQ;