import React, { useState } from "react";
import bridge from "@vkontakte/vk-bridge";
import smoothscroll from "smoothscroll-polyfill";
import queryString from "query-string";
import { platform } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {
  View,
  Snackbar,
  Avatar,
  ScreenSpinner,
  ContentCard,
  ConfigProvider,
  Div,
  SimpleCell,
  Button,
  ModalCard,
  ModalRoot,
} from "@vkontakte/vkui";

import {
  Icon56SearchLikeOutline,
  Icon56ErrorOutline,
  Icon56HideOutline,
  Icon56NotePenOutline,
} from "@vkontakte/icons";

import OverwatchDailyArcadeIcon from "./img/ow_arcade.jpg";

import fetch2 from "./components/Fetch";

import "./css/Index.css";

import Home from "./panels/Home";
import Intro from "./panels/Intro";
import Update from "./panels/Update";
import FAQ from "./panels/FAQ";
import Screenshots from "./panels/Screenshots";
import Arts from "./panels/Arts";
import Mems from "./panels/Mems";
import Randomgg from "./panels/Randomgg";
import Gameprofile from "./panels/Gameprofile";
import FindTeammate from "./panels/FindTeammate";
import Textpage from "./panels/Textpage";
import Settings from "./panels/Settings";
import Weeklyskin from "./panels/Weeklyskin";

const ROUTES = {
  HOME: "home",
  INTRO: "intro",
  UPDATE: "update",
  FAQ: "faq",
  SCREENSHOTS: "screenshots",
  ARTS: "arts",
  MEMS: "mems",
  RANDOMGG: "randomgg",
  GAMEPROFILE: "gameprofile",
  FINDTEAMMATE: "findteammate",
  TEXTPAGE: "textpage",
  SETTINGS: "settings",
  WEEKLYSKIN: "weeklyskin",
  UPDATE: "update"
};

const STORAGE_KEYS = {
  STATUS: "status",
};

smoothscroll.polyfill();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePanel: ROUTES.HOME,
      user: null,
      popout: <ScreenSpinner size="large" />,
      snackbar: null,
      ad: false,
      online: true,
      arcades: null,
      history: ["home"],
      subscribed: null,
      tab: null,
      activeModal: null,
      modalHistory: [],
      profileDataInfo: "Загрузка...",
      // scroll[0] - home screen, news tab | scroll[1] - home screen, arcades tab
      scrolls: [{ scroll: 0 }, { scroll: 0 }],
      arcadesHistory: {
        img1: null,
        img2: null,
        img3: null,
      },
      profile: {
        avatar: null,
      },
      form: {
        about: "",
        age: "",
        playtime: "",
        discord: "",
      },
      textpage: {
        title: null,
        text: null,
        button: null,
        link: null,
        success: true,
      },
    };
    this.go = this.go.bind(this);
    this.goBack = this.goBack.bind(this);
    this.viewIntro = this.viewIntro.bind(this);
    this.AndroidBackButton = this.AndroidBackButton.bind(this);
    this.saveScroll = this.saveScroll.bind(this);
    this.getScroll = this.getScroll.bind(this);
    this.clickOnLink = this.clickOnLink.bind(this);
    this.setActiveModal = this.setActiveModal.bind(this);
    this.openTextPage = this.openTextPage.bind(this);
    this.setSnackbar = this.setSnackbar.bind(this);
    this.tapticEngine = this.tapticEngine.bind(this);
  }

  componentDidMount() {
    var getParams = queryString.parse(window.location.search);

    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });

    bridge.send("VKWebAppGetUserInfo").then((data) => {
      this.setState({ user: data });
      if (getParams.vk_user_id == data.id) {
        try {
          fetch2("startapp").then((data) => {
            let arcades = [];
            data.result.arcades.map((el) => {
              arcades.push(
                <ContentCard
                  image={el.img}
                  subtitle={"Аркада #" + el.id}
                  header={el.name}
                  caption={null}
                  disabled
                  key={el.id}
                  style={{ marginBottom: "50px" }}
                />
              );
            });
            this.setState({
              arcades: arcades,
              subscribed: data.result.subscribed,
              popout: null,
              arcadesHistory: {
                img1: data.result.post0,
                img2: data.result.post1,
                img3: data.result.post2,
              },
            });
          });
        } catch (err) {
          this.setSnackbar("Не удалось загрузить информацию", 2000);
        }
      }
    });

    bridge
      .send("VKWebAppStorageGet", {
        keys: Object.values(STORAGE_KEYS),
      })
      .then((data) => {
        if (data.keys[0].value !== "true") {
          this.setState({ activePanel: ROUTES.INTRO });
        }
      });

    window.addEventListener("popstate", this.AndroidBackButton);

    window.addEventListener("offline", () => {
      bridge.send("VKWebAppDisableSwipeBack");
      this.setSnackbar("Потеряно соединение с интернетом", 2000);
      this.setState({
        activePanel: ROUTES.HOME,
        online: false,
        history: ["home"],
      });
    });

    window.addEventListener("online", () => {
      this.setState({
        online: true,
      });
      this.openTextPage(
        "Оу, кто вернулся?",
        "Теперь ты можешь продолжить наслаждаться приложением!",
        "Окей, понятно",
        true
      );
    });
  }

  setSnackbar(text, duration) {
    duration = duration || 4000;
    this.setState({
      snackbar: (
        <Snackbar
          layout="vertical"
          duration={duration}
          onClose={() => this.setState({ snackbar: null })}
        >
          {text}
        </Snackbar>
      ),
    });
  }

  tapticEngine(type) {
    type = type || "success";
    if (platform() === "ios")
      bridge.send("VKWebAppTapticNotificationOccurred", { type: type });
  }

  setActiveModal(activeModal, profileData) {
    activeModal = activeModal || null;
    profileData = profileData || { avatar: <OverwatchDailyArcadeIcon /> };
    if (profileData.battletag !== undefined && profileData.battletag !== null) {
      fetch(
        "https://owapi.io/profile/pc/eu/" +
          profileData.battletag.replace(/#/g, "-")
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.private === true && data.username !== "")
            this.setState({
              profileDataInfo:
                "Игровой профиль закрыт, невозможно получить информацию.",
            });
          else if (data.message === "Error: Profile not found")
            this.setState({
              profileDataInfo:
                "У пользователя нулевой аккаунт в Overwatch, либо его не существует.",
            });
          else if (data.username === "")
            this.setState({
              profileDataInfo:
                "Мы не смогли подгрузить информацию по профилю, так как сервер Blizzard перестал отвечать.",
            });
          else
            this.setState({
              profileDataInfoSuccess: data,
              profileDataInfo: "",
            });
        });
    } else {
      setTimeout(() => {
        this.setState({
          profileDataInfo: "Невозможно получить данные об игровом аккаунте.",
          profileDataInfoSuccess: null,
        });
      }, 300);
    }
    if (profileData.user_id === undefined) {
      setTimeout(() => {
        this.setState({
          profile: profileData,
          profileDataInfo: "Загрузка...",
        });
      }, 300);
    } else {
      this.setState({
        profile: profileData,
        profileDataInfo: "Загрузка...",
      });
    }

    let modalHistory = this.state.modalHistory
      ? [...this.state.modalHistory]
      : [];

    if (activeModal === null) {
      document.body.style.overflow = "visible";
      modalHistory = [];
    } else if (modalHistory.indexOf(activeModal) !== -1) {
      modalHistory = modalHistory.splice(
        0,
        modalHistory.indexOf(activeModal) + 1
      );
    } else {
      document.body.style.overflow = "hidden";
      modalHistory.push(activeModal);
    }
    this.setState({
      activeModal,
      modalHistory,
    });
  }

  viewIntro() {
    try {
      bridge.send("VKWebAppStorageSet", {
        key: STORAGE_KEYS.STATUS,
        value: "true",
      });
      this.setState({ activePanel: ROUTES.HOME });
    } catch (error) {
      this.setSnackbar("Упс, что-то пошло не так...", 2000);
    }
  }

  go(panel) {
    if (this.state.online === true) {
      if (this.state.activeModal !== null) {
        this.setActiveModal(null);
      } else {
        if (panel === "findteammate" && this.state.ad === false)
          bridge.send("VKWebAppShowNativeAds", { ad_format: "preloader" });
        this.setState({ ad: true });
        const history = [...this.state.history];
        history.push(panel);
        if (panel === "home") {
          bridge.send("VKWebAppDisableSwipeBack");
          this.setState({ history: ["home"], activePanel: panel, tab: null });
        } else {
          this.setState({ history: history, activePanel: panel, tab: null });
        }
        document.body.style.overflow = "visible";
        fetch2("verify")
          .then((data) => {
            if (data.result !== "ok") {
              this.setSnackbar("Упс, что-то пошло не так...", 2000);
            }
          })
          .catch(() => {
            this.setSnackbar("Упс, что-то пошло не так...", 2000);
          });
      }
    } else {
      this.setSnackbar("Нет соединения с интернетом", 1000);
    }
  }

  goBack = () => {
    if (this.state.activeModal !== null) this.setActiveModal(null);
    if (this.state.activePanel == "settings" || this.state.activePanel == "textpage") this.setState({ tab: "profile" });
    const history = [...this.state.history];
    history.pop();
    const activePanel = history[history.length - 1];
    if (activePanel === "home") {
      bridge.send("VKWebAppEnableSwipeBack");
    }
    document.body.style.overflow = "visible";
    this.setState({ history: history, activePanel });
  };

  AndroidBackButton = () => {
    if (
      this.state.activePanel !== ROUTES.HOME &&
      this.state.activePanel !== ROUTES.INTRO
    ) {
      if (this.state.activeModal !== null) {
        this.setActiveModal(null);
      } else {
        this.goBack();
      }
    } else bridge.send("VKWebAppClose", { status: "success" });
  };

  openTextPage(title, text, button, success) {
    this.setState({
      textpage: {
        title: title,
        text: text,
        button: button,
        success: success,
      },
    });
    this.go("textpage");
  }

  saveScroll(id, scroll) {
    this.state.scrolls[id].scroll = scroll;
  }

  getScroll(id) {
    return this.state.scrolls[id].scroll;
  }

  clickOnLink() {
    document.body.style.pointerEvents = "none";
    setTimeout(() => {
      document.body.style.pointerEvents = "all";
    }, 1000);
  }

  render() {
    const modal = (
      <ModalRoot activeModal={this.state.activeModal}>
        <ModalCard
          id="profile"
          onClose={() => {
            this.setActiveModal(null);
          }}
          subheader={
            <div style={{ textAlign: "left" }}>
              <SimpleCell
                disabled
                description={this.state.profile.tag}
                badge={this.state.profile.verified}
                before={<Avatar size={40} src={this.state.profile.avatar} />}
              >
                {this.state.profile.name}
              </SimpleCell>
              <Div>
                {this.state.profile.text}
                <br />
                <br />
                Возраст: {this.state.profile.age} <br />
                Игровое время: с {this.state.profile.time1}:00 до{" "}
                {this.state.profile.time2}:00 по МСК <br />
                Микрофон: {this.state.profile.microphone == 1 && "Да"}{" "}
                {this.state.profile.microphone == 0 && "Нет"} <br />
                Discord:{" "}
                {this.state.profile.discord
                  ? this.state.profile.discord.replace(/-/g, "#")
                  : "Не привязан"}{" "}
                <br />
                <br />
                {this.state.profileDataInfo}
                {this.state.profileDataInfoSuccess && (
                  <div>
                    Статистика аккаунта: <br />
                    Игровой лвл: {this.state.profileDataInfoSuccess.level} |
                    Уровень репутации:{" "}
                    {this.state.profileDataInfoSuccess.endorsement.frame.substr(
                      -1
                    )}{" "}
                    <br />
                    Ранкед: <br />
                    Танки -{" "}
                    {this.state.profileDataInfoSuccess.competitive.tank.rank
                      ? this.state.profileDataInfoSuccess.competitive.tank.rank
                      : "калибровка"}
                    <br />
                    Дамагеры -{" "}
                    {this.state.profileDataInfoSuccess.competitive.damage.rank
                      ? this.state.profileDataInfoSuccess.competitive.damage
                          .rank
                      : "калибровка"}
                    <br />
                    Хилы -{" "}
                    {this.state.profileDataInfoSuccess.competitive.support.rank
                      ? this.state.profileDataInfoSuccess.competitive.support
                          .rank
                      : "калибровка"}
                  </div>
                )}
              </Div>
            </div>
          }
          actions={
            <Button
              size="l"
              onClick={() => {
                this.clickOnLink;
              }}
              className="fixButton"
              mode="primary"
              href={"https://vk.com/write" + this.state.profile.user_id}
              target="_blank"
            >
              Написать в личку
            </Button>
          }
        ></ModalCard>

        <ModalCard
          id="start1"
          onClose={() => {
            this.setActiveModal("start2");
          }}
          icon={<Icon56SearchLikeOutline />}
          header="Mada-mada!"
          subheader={
            "Добро пожаловать в раздел, где ты сможешь найти любого интересующего тебя игрока: покет мерси, райнхардта, который не чарджится в толпу, или же вдову с хорошим аимом. Мы проведем небольшой инструктаж для тебя, хорошо?"
          }
          actions={
            <Button
              size="l"
              mode="primary"
              onClick={() => {
                this.setActiveModal("start2");
                this.clickOnLink;
              }}
            >
              Окей, начнём
            </Button>
          }
        />

        <ModalCard
          id="start2"
          onClose={() => {
            this.setActiveModal("start3");
          }}
          icon={<Icon56ErrorOutline />}
          header="Начнём с того, что тут запрещены маты и оскорбления"
          subheader={
            "Использовать нецензурную брань в описании профиля, батлнет-теге, дискорд-теге запрещено, так как это противоречит правилам VK Mini Apps. Если мы обнаружим в твоих текстах маты и оскорбления, то твой профиль будет заблокирован. Будь добрее, камон! Агрессия - это плохо!"
          }
          actions={
            <Button
              size="l"
              mode="primary"
              onClick={() => {
                this.setActiveModal("start3");
                this.clickOnLink;
              }}
            >
              Оки, не буду материться
            </Button>
          }
        />

        <ModalCard
          id="start3"
          onClose={() => {
            this.setActiveModal("start4");
          }}
          icon={<Icon56HideOutline />}
          header="Скрытие профиля"
          subheader={
            "В любой момент времени ты можешь скрыть профиль и он не будет отображаться в ленте. Однако со скрытым профилем ты не сможешь лайкать других пользователей, как и они тебя."
          }
          actions={
            <Button
              size="l"
              mode="primary"
              onClick={() => {
                this.setActiveModal("start4");
                this.clickOnLink;
              }}
            >
              Ясно-понятно!
            </Button>
          }
        />

        <ModalCard
          id="start4"
          onClose={() => {
            this.setActiveModal(null);
            setTimeout(() => {this.go("settings");}, 500)
          }}
          icon={<Icon56NotePenOutline />}
          header="Ну что, начнём?"
          subheader={
            "Чтобы начать пользоваться разделом заполни профиль и переключи тумблер 'Отображение профиля'."
          }
          actions={
            <Button
              size="l"
              mode="primary"
              onClick={() => {
                setTimeout(() => {this.go("settings");}, 500)
                this.clickOnLink;
                this.setActiveModal(null);
              }}
            >
              Ох, ну начнём!
            </Button>
          }
        />
      </ModalRoot>
    );
    if (platform() !== "ios") history.pushState(null, null);
    return (
      <ConfigProvider isWebView={true}>
        <View
          activePanel={this.state.activePanel}
          modal={modal}
          popout={this.state.popout}
          onSwipeBack={this.goBack}
          history={this.state.history}
        >
          <Home
            id={ROUTES.HOME}
            go={this.go}
            subscribed={this.state.subscribed}
            clickOnLink={this.clickOnLink}
            arcadesHistory={this.state.arcadesHistory}
            saveScroll={this.saveScroll}
            getScroll={this.getScroll}
            arcades={this.state.arcades}
            user={this.state.user}
            setSnackbar={this.setSnackbar}
            snackbar={this.state.snackbar}
            tapticEngine={this.tapticEngine}
          />
          <Intro id={ROUTES.INTRO} go={this.viewIntro} user={this.state.user} snackbar={this.state.snackbar} />
          <Update
            id={ROUTES.UPDATE}
            go={this.go}
            clickOnLink={this.clickOnLink}
          />
          <FAQ id={ROUTES.FAQ} go={this.go} clickOnLink={this.clickOnLink} />
          <Screenshots
            id={ROUTES.SCREENSHOTS}
            setSnackbar={this.setSnackbar}
            snackbar={this.state.snackbar}
            go={this.go}
            clickOnLink={this.clickOnLink}
          />
          <Arts
            id={ROUTES.ARTS}
            go={this.go}
            setSnackbar={this.setSnackbar}
            snackbar={this.state.snackbar}
            clickOnLink={this.clickOnLink}
          />
          <Mems
            id={ROUTES.MEMS}
            go={this.go}
            setSnackbar={this.setSnackbar}
            snackbar={this.state.snackbar}
            clickOnLink={this.clickOnLink}
          />
          <Randomgg id={ROUTES.RANDOMGG} go={this.go} tapticEngine={this.tapticEngine} />
          <Gameprofile
            id={ROUTES.GAMEPROFILE}
            go={this.go}
            user={this.state.user}
            tapticEngine={this.tapticEngine}
          />
          <FindTeammate
            id={ROUTES.FINDTEAMMATE}
            tab={this.state.tab}
            openTextPage={this.openTextPage}
            go={this.go}
            user={this.state.user}
            setSnackbar={this.setSnackbar}
            snackbar={this.state.snackbar}
            setActiveModal={this.setActiveModal}
            clickOnLink={this.clickOnLink}
            tapticEngine={this.tapticEngine}
          />
          <Settings
            id={ROUTES.SETTINGS}
            go={() => {
              this.goBack("profile");
            }}
            setSnackbar={this.setSnackbar}
            setActiveModal={this.setActiveModal}
            tapticEngine={this.tapticEngine}
          />
          <Textpage
            id={ROUTES.TEXTPAGE}
            title={this.state.textpage.title}
            text={this.state.textpage.text}
            button={this.state.textpage.button}
            link={this.state.textpage.link}
            success={this.state.textpage.success}
            go={this.goBack}
          />
          <Weeklyskin
            id={ROUTES.WEEKLYSKIN}
            go={this.goBack}
            clickOnLink={this.clickOnLink}
          />
        </View>
      </ConfigProvider>
    );
  }
}

export default App;
