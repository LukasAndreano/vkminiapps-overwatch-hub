import React, { useState } from 'react';
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
				ОБНОВЛЕНИЕ
			</PanelHeader>
			<Div>
				<Card>
					<Div>
						<Title level="2" weight="heavy" style={{ marginBottom: 10 }}>Обратите внимание, что...</Title>
						<Text weight="regular">Здесь собраны только все новые скины и позы. Анимации лучшего момента матча, граффити, реплики, значки можно посмотреть в статье, ссылка на которую прикреплена в самом низу этой страницы. Отдельное спасибо группе «OverFire».</Text>
					</Div>
				</Card>	
			</Div>
			<Group header={<Header mode="secondary">СКИНЫ ЗА ПОБЕДЫ</Header>} style={{ marginTop: -15 }}>
				<CardScroll size="l">
		            <ContentCard
		              image={Baptist}
		              subtitle="НАГРАДЫ ЗА ПОБЕДУ"
		              header="Скин за первую неделю испытаний!"
		              text="Одерживайте победы в «Быстрой игре», «Соревновательной игре» или «Аркаде», чтобы получить «Терракотовый медик» для Батиста. Для получения необходимо совершить 9 побед."
		              caption="Этот скин невозможно приобрести за монеты."
		              maxHeight={200}
		            />
		            <ContentCard
		              image={Mccree}
		              subtitle="НАГРАДЫ ЗА ПОБЕДУ"
		              header="Скин за вторую неделю испытаний!"
		              text="Одерживайте победы в «Быстрой игре», «Соревновательной игре» или «Аркаде», чтобы получить «Сякэ» для Маккри. Для получения необходимо совершить 9 побед."
		              caption="Этот скин невозможно приобрести за монеты."
		              maxHeight={200}
		            />
		            <ContentCard
		              image={Reaper}
		              subtitle="НАГРАДЫ ЗА ПОБЕДУ"
		              header="Скин за третью неделю испытаний!"
		              text="Одерживайте победы в «Быстрой игре», «Соревновательной игре» или «Аркаде», чтобы получить «Гвардеец императора» для Жнеца. Для получения необходимо совершить 9 побед."
		              caption="Этот скин невозможно приобрести за монеты."
		              maxHeight={200}
		            />
		        </CardScroll>
			</Group>
			<Group header={<Header mode="secondary">СКИНЫ ЗА ИГРОВУЮ АКТИВНОСТЬ</Header>}>
				<CardScroll size="l">
		            <ContentCard
		              image={Bastion}
		              subtitle="НОВЫЙ СКИН"
		              header="Скин «Пламя Дракона» для Бастиона"
		              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 3000 монет"
		              maxHeight={200}
		            />
		            <ContentCard
		              image={Ashe}
		              subtitle="НОВЫЙ СКИН"
		              header="Скин «Охотница на тигров» для Эш"
		              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 3000 монет"
		              maxHeight={200}
		            />
		            <ContentCard
		              image={Echo}
		              subtitle="НОВЫЙ СКИН"
		              header="Скин «Ккачхи» для Эхо"
		              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 3000 монет"
		              maxHeight={200}
		            />
		            <ContentCard
		              image={Orisa}
		              subtitle="НОВЫЙ СКИН"
		              header="Скин «Дух быка» для Орисы"
		              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 3000 монет"
		              maxHeight={200}
		            />
		            <ContentCard
		              image={Widow}
		              subtitle="НОВЫЙ СКИН"
		              header="Скин «Белая змея» для Роковой вдовы"
		              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 3000 монет"
		              maxHeight={200}
		            />
		        </CardScroll>
			</Group>
			<Group header={<Header mode="secondary">ПОЗЫ ЗА ИГРОВУЮ АКТИВНОСТЬ</Header>}>
				<CardScroll size="l">
		            <ContentCard
		              image={Pose1}
		              subtitle="НОВАЯ ПОЗА"
		              header="Поза для Бригитты"
		              text="Эту позу можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 750 монет"
		              maxHeight={200}
		            />
		            <ContentCard
		              image={Pose2}
		              subtitle="НОВАЯ ПОЗА"
		              header="Поза для Мойры"
		              text="Эту позу можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 750 монет"
		              maxHeight={200}
		            />
		            <ContentCard
		              image={Pose3}
		              subtitle="НОВАЯ ПОЗА"
		              header="Поза для Солдата-76"
		              text="Эту позу можно получить из контейнера или приобрести за внутриигровую валюту."
		              caption="Стоимость: 750 монет"
		              maxHeight={200}
		            />
		        </CardScroll>
			</Group>
		    <Div>
		      <Button size="l" stretched mode="secondary" href="https://vk.com/@overfire-year-of-the-ox-overwatch">Все новинки</Button>
		    </Div>
		</Panel>
		)
	}
}

export default Update;