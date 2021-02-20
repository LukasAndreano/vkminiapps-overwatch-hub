import React from 'react';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Group,
	ContentCard,
	Div,
	Button,
	CardGrid
} from '@vkontakte/vkui';

import Skin from '../img/reaper.jpg';

class Weeklyskin extends React.Component {
	render() {
		let {id, go} = this.props;
		return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>} >
				Испытание
			</PanelHeader>
			<Group>
				<CardGrid size="l">
				    <ContentCard
				        image={Skin}
						disabled
				        header="Скин за вторую неделю испытаний!"
				        text="Одерживайте победы в «Быстрой игре», «Соревновательной игре» или «Аркаде», чтобы получить «Гвардеец императора» для Жнеца. Для получения необходимо совершить 9 побед."
						caption="Этот скин невозможно приобрести за монеты."
				        maxheight={200}
				    />
				</CardGrid>
		    <Div>
		      <Button size="l" stretched mode="secondary" onClick={go} data-to="home">Назад в меню</Button>
		    </Div>
			</Group>
		</Panel>
		)
	}
}

export default Weeklyskin;