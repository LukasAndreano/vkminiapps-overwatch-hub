import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

const qs = require('querystring');
const request = require('sync-request');

const key = 'atQ9fP8qbNZUZ5Qm';

const ordered = {};

Object.keys(qs.parse(location.search)).sort().forEach((key) => {
	ordered[key] = qs.parse(location.search)[key];
});

if (JSON.parse(request('GET', 'https://cloud.irbot.net/ow_arcade/api?act=checksign&key=' + key + '&'+qs.stringify(ordered).substr(3)).getBody('utf8')).result === true) {
	bridge.send("VKWebAppInit");
	ReactDOM.render(<App />, document.getElementById("root"));
	if (process.env.NODE_ENV === "development") {
	  import("./eruda").then(({ default: eruda }) => {});
	}
} else {
	ReactDOM.render("Неверная подпись параметров запуска.", document.getElementById("root"));
}