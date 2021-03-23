import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

fetch('https://cloud.irbot.net/ow_arcade/api?act=verify&' + window.location.href.slice(window.location.href.indexOf('?') + 1))
    .then(response => response.json())
    .then(data => {
      if (data.result === 'ok') {
        bridge.send("VKWebAppInit");
        ReactDOM.render(<App />, document.getElementById("root"));
        if (process.env.NODE_ENV === "development") {
          import("./eruda").then(({ default: eruda }) => {});
        }
      } else {
        ReactDOM.render("Неверная подпись параметров запуска.", document.getElementById("root"));
      }
    });