import React from 'react';
import Confetti from 'react-confetti';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Group,
	Div,
	Button,
	Avatar,
	Title,
	Text,
} from '@vkontakte/vkui';

import OverwatchDailyArcadeIcon from '../img/ow_arcade.jpg';
import Avatar1 from '../img/random1.png';

import '../css/Intro.css';

class Randomgg extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
		name: null,
      }
      this.random = this.random.bind(this);
    }
	randomInteger(min, max) {
	  let rand = min + Math.random() * (max + 1 - min);
	  return Math.floor(rand);
	}
    random() {
    	let gg = [{"name": "D.Va"}, {"name": "Ану"}, {"name": "Ангелу"}, {"name": "Бастиона"}, {"name": "Батиста"}, {"name": "Бригитту"}, {"name": "Гэндзи"}, {"name": "Дзенъятту"}, {"name": "Жнеца"}, {"name": "Зарю"}, {"name": "Крысавчика"}, {"name": "Кулака смерти"}, {"name": "Лусио"}, {"name": "Маккри"}, {"name": "Мойру"}, {"name": "Мэй"}, {"name": "Орису"}, {"name": "Райнхардта"}, {"name": "Роковую вдову"}, {"name": "Сигму"}, {"name": "Симметру"}, {"name": "Солдата-76"}, {"name": "Сомбру"}, {"name": "Тарана"}, {"name": "Торбьорна"}, {"name": "Трейсер"}, {"name": "Турбосвина"}, {"name": "Уинстона"}, {"name": "Фарру"}, {"name": "Хандзо"}, {"name": "Эхо"}, {"name": "Эш"}];
    	let name = gg[this.randomInteger(0,31)].name;
    	this.setState({name: name});
    }
	render() {
		let {id, go} = this.props;
		return (
		<Panel id={id} centered={true}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>} >
				Случайный ГГ
			</PanelHeader>
			{this.state.name == null &&
			<Group>
				<Div className="WelcomeBlock">
					<Avatar src={OverwatchDailyArcadeIcon} size={64} />
					<Title level="1" weight="bold" style={{ marginBottom: 16 }}>Случайный голдган</Title>
					<Text weight="regular">Не знаешь на какого персонажа купить золотое оружие? Этот раздел отлично справляется с этой целью. Кликай на кнопку ниже!</Text>
					<Button size="l" stretched mode="secondary" onClick={this.random}>Погнали!</Button>
				</Div>
			</Group>}
			{this.state.name !== null &&
			<Group>
				<Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={50} />
				<Div className="WelcomeBlock">
					<Avatar src={Avatar1} size={64} />
					<Title level="1" weight="bold" style={{ marginBottom: 16 }}>Покупай золотое оружие на {this.state.name}</Title>
					<Text weight="regular">Рандомайзер принял своё решение. Однозначно нужно покупать золотое оружие на {this.state.name}!</Text>
					<Button size="l" stretched mode="secondary" onClick={this.random}>Попробовать еще раз!</Button>
				</Div>
			</Group>
			}
		</Panel>
		)
	}
}

export default Randomgg;