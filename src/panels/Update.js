import React from "react"
import bridge from "@vkontakte/vk-bridge";;
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
} from "@vkontakte/vkui";

import week1 from "../img/events/week1.webp";
import week2 from "../img/events/week2.webp";
import week3 from "../img/events/week3.webp";

import genji from "../img/events/genji.webp";
import tracer from "../img/events/tracer.webp";
import zarya from "../img/events/zarya.webp";
import soldier from "../img/events/soldier.webp";
import widow from "../img/events/widow.webp";

import baptist from "../img/events/baptist.webp";
import doomfist from "../img/events/doomfist.webp";
import echo from "../img/events/echo.webp";

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.openImage = this.openImage.bind(this);
  }
  openImage(imgURL) {
    bridge.send("VKWebAppShowImages", { images: [imgURL] });
  }
  render() {
    let { id, go } = this.props;
    return (
      <Panel id={id}>
        <PanelHeader
          separator={false}
          left={<PanelHeaderBack onClick={() => go("home")} />}
        >
          Обновление
        </PanelHeader>
        <Group header={<Header mode="secondary">СКИНЫ ЗА ЗВЁЗДЫ В ИСПЫТАНИЯХ</Header>}>
          <CardScroll size="l">
            <ContentCard
              image={week1}
              header="Скин на Лусио"
              text="Зарабатывайте звёзды в PvE-миссиях и получайте награды! Для получения эпического облика на Лусио «Гонщик» необходимо получить 30 звёзд."
              caption="Этот скин невозможно приобрести за монеты."
              maxHeight={200}
              onClick={() => {
                this.props.clinkOnLink;
                this.openImage(
                  "https://sun9-11.userapi.com/impg/oSqum8-KFljl5ObLwbsYl_J61FGeYIIp8cHPHg/V54sOBA2cHw.jpg?size=1280x720&quality=96&sign=82a71d53b172c47e8ea2505acda36b5d&type=album"
                );
              }}
              disabled
              className="UpdateBlock"
            />
            <ContentCard
              image={week2}
              header="Скин на Дзенъятту"
              text="Зарабатывайте звёзды в PvE-миссиях и получайте награды! Для получения эпического облика на Дзенъятту «Подводник» необходимо получить 30 звёзд."
              caption="Этот скин невозможно приобрести за монеты."
              maxHeight={200}
              onClick={() => {
                this.props.clinkOnLink;
                this.openImage(
                  "https://sun9-23.userapi.com/impg/dSIyYj39QOC36tSD35voEfouDCvW0VKiRvXj2g/jTV3elSCWGw.jpg?size=1280x720&quality=96&sign=98ef56eae110bd61ecc40aa1d0a1778b&type=album"
                );
              }}
              disabled
              className="UpdateBlock"
            />
            <ContentCard
              image={week3}
              header="Скин на Ангела"
              text="Зарабатывайте звёзды в PvE-миссиях и получайте награды! Для получения эпического облика на Ангела «Камуфляж» необходимо получить 30 звёзд."
              caption="Этот скин невозможно приобрести за монеты."
              maxHeight={200}
              onClick={() => {
                this.props.clinkOnLink;
                this.openImage(
                  "https://sun9-55.userapi.com/impg/kKaE4avtqtWMmMYlfCghAc6GE8sVeSV2bnwi5A/X-wfzJCY2KI.jpg?size=1280x720&quality=96&sign=5b15c2c9859dfd9fcce9bbbdf361a70d&type=album"
                );
              }}
              disabled
              className="UpdateBlock"
            />
          </CardScroll>
        </Group>
        <Group
          header={<Header mode="secondary">СКИНЫ ЗА ИГРОВУЮ АКТИВНОСТЬ</Header>}
        >
          <CardScroll size="l">
            <ContentCard
              image={genji}
              disabled
              subtitle="НОВЫЙ СКИН"
              header="Скин «Самуруй» на Гэндзи"
              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
              caption="Стоимость: 3000 монет"
              maxheight={200}
              className="UpdateBlock"
              onClick={() => {
                this.props.clinkOnLink;
                this.openImage(
                  "https://sun9-39.userapi.com/impg/ZzxW1e99fhrLjZIzr8O6hmdszLRZT3P3pGFFHA/qkbqG-3qEfs.jpg?size=1280x720&quality=96&sign=35df9c96a3dce3da99f73091ccdb65b3&type=album"
                );
              }}
            />
            <ContentCard
              image={tracer}
              disabled
              subtitle="НОВЫЙ СКИН"
              header="Скин «Кавалеристка» на Трейсер"
              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
              caption="Стоимость: 3000 монет"
              maxheight={200}
              className="UpdateBlock"
              onClick={() => {
                this.props.clinkOnLink;
                this.openImage(
                  "https://sun9-58.userapi.com/impg/B-ucoifjaS2oXwLyOXNaeNUGasdkAstWpO88LQ/_j9ke9bfQzA.jpg?size=1280x720&quality=96&sign=a2d7ea0fe027566a7d2c15cf267b67ca&type=album"
                );
              }}
            />
            <ContentCard
              image={zarya}
              disabled
              subtitle="НОВЫЙ СКИН"
              header="Скин «Поляница» на Зарю"
              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
              caption="Стоимость: 3000 монет"
              maxheight={200}
              className="UpdateBlock"
              onClick={() => {
                this.props.clinkOnLink;
                this.openImage(
                  "https://sun9-64.userapi.com/impg/XahCprUUccZxrMNg0mtfN8SwfUjADW-ZEppsSg/Qsvv6wAMj-0.jpg?size=1280x720&quality=96&sign=ccc562ecffbc0720b51140b5b0b58705&type=album"
                );
              }}
            />
            <ContentCard
              image={soldier}
              disabled
              subtitle="НОВЫЙ СКИН"
              header="Скин «Солдат-1776» на Солдата-76"
              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
              caption="Стоимость: 3000 монет"
              maxheight={200}
              className="UpdateBlock"
              onClick={() => {
                this.props.clinkOnLink;
                this.openImage(
                  "https://sun9-26.userapi.com/impg/yR1XPf40AH063jqKxVkWVVnxLulADF2OP3YDOw/dUvcc4qgEX8.jpg?size=1280x720&quality=96&sign=d9052153b1bac322305568cc292f8ae5&type=album"
                );
              }}
            />
            <ContentCard
              image={widow}
              disabled
              subtitle="НОВЫЙ СКИН"
              header="Скин «Мушекетер» на Роковую вдову"
              text="Этот скин можно получить из контейнера или приобрести за внутриигровую валюту."
              caption="Стоимость: 3000 монет"
              maxheight={200}
              className="UpdateBlock"
              onClick={() => {
                this.props.clinkOnLink;
                this.openImage(
                  "https://sun9-58.userapi.com/impg/rP0NqX7jqp9udEJBfUiZrHuzBW9KrQtsjVMTkg/VdHbZKgVdGA.jpg?size=1280x720&quality=96&sign=a145aae85a54ed5a5c7260b4ad734223&type=album"
                );
              }}
            />
          </CardScroll>
        </Group>
        <Group
          header={<Header mode="secondary">ПОЗЫ ЗА ИГРОВУЮ АКТИВНОСТЬ</Header>}
        >
          <CardScroll size="l">
            <ContentCard
              image={baptist}
              disabled
              subtitle="НОВАЯ ПОЗА"
              header="Поза на Батиста"
              text="Эту позу можно получить из контейнера или приобрести за внутриигровую валюту."
              caption="Стоимость: 750 монет"
              maxheight={200}
              className="UpdateBlock"
              onClick={() => {
                this.props.clinkOnLink;
                this.openImage(
                  "https://sun9-21.userapi.com/impg/JhgT07OvEH08bWriCMOF98pyP7wUDpCXuX2opQ/GazeISnmR3c.jpg?size=1280x720&quality=96&sign=2a9e66975ac9136aca285961a23c9665&type=album"
                );
              }}
            />
            <ContentCard
              image={doomfist}
              disabled
              subtitle="НОВАЯ ПОЗА"
              header="Поза на Кулака Смерти"
              text="Эту позу можно получить из контейнера или приобрести за внутриигровую валюту."
              caption="Стоимость: 750 монет"
              maxheight={200}
              className="UpdateBlock"
              onClick={() => {
                this.props.clinkOnLink;
                this.openImage(
                  "https://sun9-64.userapi.com/impg/QbbqcPYc3iSBTqDL-CkZTxnwJEF1qlgftrok3Q/YmKfzgQc3lg.jpg?size=1280x720&quality=96&sign=6491026b9962fe3752ec05e1693ee349&type=album"
                );
              }}
            />
            <ContentCard
              image={echo}
              disabled
              subtitle="НОВАЯ ПОЗА"
              header="Поза на Эхо"
              text="Эту позу можно получить из контейнера или приобрести за внутриигровую валюту."
              caption="Стоимость: 750 монет"
              maxheight={200}
              className="UpdateBlock"
              onClick={() => {
                this.props.clinkOnLink;
                this.openImage(
                  "https://sun9-67.userapi.com/impg/4VWsWKFVX6XjNerwyLpQ52CNEky5jJrUzvq8NA/0tOmIYLGh6U.jpg?size=1280x720&quality=96&sign=4a02cf2e49dfbdb81a34a421387fef3f&type=album"
                );
              }}
            />
          </CardScroll>
        </Group>
        <Div>
          <Button
            size="l"
            onClick={this.props.clickOnLink}
            stretched
            mode="secondary"
            href="https://vk.com/@overfire-overwatch-archives-2021"
            target="_blank"
          >
            Все новинки
          </Button>
        </Div>
      </Panel>
    );
  }
}

export default Update;
