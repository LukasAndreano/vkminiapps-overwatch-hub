import React from "react";
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Group,
	ContentCard,
	CardGrid,
	Div,
	Button,
} from "@vkontakte/vkui";

class FAQ extends React.Component {
	render() {
		let { id, go } = this.props;
		return (
			<Panel id={id}>
				<PanelHeader
					separator={false}
					left={<PanelHeaderBack onClick={() => go("home")} />}
				>
					FAQ
				</PanelHeader>
				<Group>
					<CardGrid size="l">
						<ContentCard
							subtitle="СВЯЗЬ С ACTIVISION BLIZZARD"
							disabled
							header="Информация про приложение"
							text="Overwatch Hub не является официальным приложением и никаким образом не связан с Activision Blizzard."
							maxheight={200}
						/>
						<ContentCard
							subtitle="ИНФОРМАЦИЯ ПРО СПИСОК АРКАД"
							disabled
							header="Список аркад"
							text="Список аркад в истории обновляется ежедневно в 07:00 по МСК."
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
							text="Текущая версия приложения: 1.3.1. Разработчик: Никита Балин"
							maxheight={200}
						/>
					</CardGrid>
					<Div>
						<Button
							size="l"
							onClick={this.props.clickOnLink}
							stretched
							mode="secondary"
							href="https://vk.me/darkflamept"
							target="_blank"
						>
							Написать админу
						</Button>
						<Button
							size="l"
							onClick={this.props.clickOnLink}
							style={{ marginTop: 10 }}
							stretched
							mode="secondary"
							href="https://vk.com/ow.arcade"
							target="_blank"
						>
							Открыть сообщество
						</Button>
					</Div>
				</Group>
			</Panel>
		);
	}
}

export default FAQ;
