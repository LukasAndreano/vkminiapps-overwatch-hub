import React from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  ContentCard,
  Div,
  Button,
  CardGrid,
} from "@vkontakte/vkui";

import event_march_hog from "../img/event_march_hog.jpg";

class Weeklyskin extends React.Component {
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
          Испытание
        </PanelHeader>
        <CardGrid size="l" style={{ paddingTop: 15 }}>
          <ContentCard
            onError={(e) => {
              e.target.style.display = "none";
              this.setState({
                snackbar: (
                  <Snackbar onClose={() => this.setState({ snackbar: null })}>
                    Произошла ошибка при загрузке картинки в ленте. Повторите
                    запрос позже.
                  </Snackbar>
                ),
              });
            }}
            image={event_march_hog}
            header="Скин на Турбосвина"
            text="Одерживайте победы в «Быстрой игре», «Соревновательной игре» или «Аркаде», чтобы получить скин для Турбосвина. Для получения необходимо совершить 9 побед."
            caption="Этот скин невозможно приобрести за монеты."
            maxHeight={200}
            onClick={() => {
              this.props.clinkOnLink;
              this.openImage(
                "https://sun9-47.userapi.com/impg/LPQJwuF3nLPsuuh6uphZenRfzDFgvSoi_oN3tg/lN0eKPDavS0.jpg?size=1280x719&quality=96&sign=a19c502076b0cb982eed0f4bd57a1122&type=album"
              );
            }}
            disabled
          />
        </CardGrid>
        <Div>
          <Button
            size="l"
            stretched
            mode="secondary"
            onClick={() => go("home")}
          >
            Назад в меню
          </Button>
        </Div>
      </Panel>
    );
  }
}

export default Weeklyskin;
