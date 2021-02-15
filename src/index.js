import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import crypto from 'crypto';

function verifyLaunchParams(searchOrParsedUrlQuery, secretKey) {
  let sign;
  const queryParams = [];
  const processQueryParam = (key, value) => {
    if (typeof value === 'string') {
      if (key === 'sign') {
        sign = value;
      } else if (key.startsWith('vk_')) {
        queryParams.push({key, value});
      }
    }
  };
  if (typeof searchOrParsedUrlQuery === 'string') {
    const formattedSearch = searchOrParsedUrlQuery.startsWith('?')
      ? searchOrParsedUrlQuery.slice(1)
      : searchOrParsedUrlQuery;
    for (const param of formattedSearch.split('&')) {
      const [key, value] = param.split('=');
      processQueryParam(key, value);
    }
  } else {
    for (const key of Object.keys(searchOrParsedUrlQuery)) {
      const value = searchOrParsedUrlQuery[key];
      processQueryParam(key, value);
    }
  }
  if (!sign || queryParams.length === 0) {
    return false;
  }
  const queryString = queryParams
    .sort((a, b) => a.key.localeCompare(b.key))
    .reduce((acc, {key, value}, idx) => {
      return acc + (idx === 0 ? '' : '&') + `${key}=${encodeURIComponent(value)}`;
    }, '');
  const paramsHash = crypto
    .createHmac('sha256', secretKey)
    .update(queryString)
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=$/, '');
  return paramsHash === sign;
}

if (verifyLaunchParams(window.location.href.slice(window.location.href.indexOf('?') + 1), 'rUFaYSzSdg7ydkYAMb3B') === true) {
	bridge.send("VKWebAppInit");
	ReactDOM.render(<App />, document.getElementById("root"));
	if (process.env.NODE_ENV === "development") {
	  import("./eruda").then(({ default: eruda }) => {});
	}
} else {
	ReactDOM.render("Неверная подпись параметров запуска.", document.getElementById("root"));
}