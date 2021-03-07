import React from 'react';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Group,
	Header,
	ContentCard,
	Div,
	Button,
	CardScroll,
	Title,
	Text,
	Card
} from '@vkontakte/vkui';

import Baptist from '../img/baptist.jpg';
import Mccree from '../img/mccree.jpg';
import Reaper from '../img/reaper.jpg';
import Bastion from '../img/bastion.jpg';
import Ashe from '../img/ashe.jpg';
import Echo from '../img/echo.jpg';
import Orisa from '../img/orisa.jpg';
import Widow from '../img/widow.jpg';

import Pose1 from '../img/brig_pose.jpg';
import Pose2 from '../img/moira_pose.jpg';
import Pose3 from '../img/soldier_pose.jpg';

class Update extends React.Component {
	render() {
		let {id, go} = this.props;
		return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>} >
				Обновление
			</PanelHeader>
			<Div>
				<Card>
					<Div>
						<Title level="2" weight="heavy" style={{ marginBottom: 10 }}>Обрати внимание, что...</Title>
						<Text weight="regular">Ивент "Лунный Новый год" уже закончился (25.02.2021). Однако эта страница будет существовать до начала следующего ивента "Архивы".</Text>
					</Div>
				</Card>	
			</Div>
			<Group header={<Header mode="secondary">СКИНЫ ЗА ПОБЕДЫ</Header>}>
				<CardScroll size="l">
		            <ContentCard
		              image={Baptist}
					  disabled
		              subtitle="НАГРАДЫ ЗА ПОБЕДУ"
		              header="Скин за первую неделю испытаний!"
		              text="Одерживайте победы в «Быстрой игре», «Соревновательной игре» или «Аркаде», чтобы получить «Терракотовый медик» для Батиста. Для получения необходимо совершить 9 побед."
		              caption="Этот скин невозможно приобрести за монеты."
		              maxheight={200}
					  className="UpdateBlock"
		            />
		            <ContentCard
		              image={Mccree}
					  disabled
		              subtitle="НАГРАДЫ ЗА ПОБЕДУ"
		              header="Скин за вторую неделю испытаний!"
		              text="Одерживайте победы в «Быстрой игре», «Соревновательной игре» или «Аркаде», чтобы получить «Сякэ» для Маккри. Для получения необходимо совершить 9 побед."
		              caption="Этот скин невозможно приобрести за монеты."
		              maxheight={200}
					  className="UpdateBlock"
		            />
		            <ContentCard
		              image={Reaper}
					  disabled
		              subtitle="НАГРАДЫ ЗА ПОБЕДУ"
		              header="Скин за третью неделю испытаний!"
		              text="Одерживайте победы в «Быстрой игре», «Соревновательной игре» или «Аркаде», чтобы получить «Гвардеец императора» для Жнеца. Для получения необходимо совершить 9 побед."
		              caption="Этот скин невозможно приобрести за монеты."
		              maxheight={200}
					  className="UpdateBlock"
		            />
		        </CardScroll>
			</Group>
			<Group header={<Header mode="secondary">СКИНЫ ЗА ИГРОВУЮ АКТИВНОСТЬ</Header>}>
				<CardScroll size="l">
		            <ContentCard
		              image={Bastion}
					  disabled
		              subtitle="НОВЫЙ СКИН"
		              header="Скин «Пламя Дракона» для Бастиона"
		              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 3000 монет"
		              maxheight={200}
					  className="UpdateBlock"
		            />
		            <ContentCard
		              image={Ashe}
					  disabled
		              subtitle="НОВЫЙ СКИН"
		              header="Скин «Охотница на тигров» для Эш"
		              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 3000 монет"
		              maxheight={200}
					  className="UpdateBlock"
		            />
		            <ContentCard
		              image={Echo}
					  disabled
		              subtitle="НОВЫЙ СКИН"
		              header="Скин «Ккачхи» для Эхо"
		              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 3000 монет"
		              maxheight={200}
					  className="UpdateBlock"
		            />
		            <ContentCard
		              image={Orisa}
					  disabled
		              subtitle="НОВЫЙ СКИН"
		              header="Скин «Дух быка» для Орисы"
		              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 3000 монет"
		              maxheight={200}
					  className="UpdateBlock"
		            />
		            <ContentCard
		              image={Widow}
					  disabled
		              subtitle="НОВЫЙ СКИН"
		              header="Скин «Белая змея» для Роковой вдовы"
		              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 3000 монет"
		              maxheight={200}
					  className="UpdateBlock"
		            />
		        </CardScroll>
			</Group>
			<Group header={<Header mode="secondary">ПОЗЫ ЗА ИГРОВУЮ АКТИВНОСТЬ</Header>}>
				<CardScroll size="l">
		            <ContentCard
		              image={Pose1}
					  disabled
		              subtitle="НОВАЯ ПОЗА"
		              header="Поза для Бригитты"
		              text="Эту позу можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 750 монет"
		              maxheight={200}
					  className="UpdateBlock"
		            />
		            <ContentCard
		              image={Pose2}
					  disabled
		              subtitle="НОВАЯ ПОЗА"
		              header="Поза для Мойры"
		              text="Эту позу можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 750 монет"
		              maxheight={200}
					  className="UpdateBlock"
		            />
		            <ContentCard
		              image={Pose3}
					  disabled
		              subtitle="НОВАЯ ПОЗА"
		              header="Поза для Солдата-76"
		              text="Эту позу можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 750 монет"
		              maxheight={200}
					  className="UpdateBlock"
		            />
		        </CardScroll>
			</Group>
		    <Div>
		      <Button size="l" onClick={this.props.clickOnLink} stretched mode="secondary" href="https://vk.com/@overfire-year-of-the-ox-overwatch" target = "_blank">Все новинки</Button>
		    </Div>
		</Panel>
		)
	}
}

export default Update;