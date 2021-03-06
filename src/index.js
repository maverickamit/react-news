import React from "react";
import ReactDOM from "react-dom";
import JavascriptTimeAgo from "javascript-time-ago";
import { BrowserRouter as Router } from "react-router-dom";
import en from "javascript-time-ago/locale/en";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { FeedsStore } from "./store";
const feedsStore = new FeedsStore();

// The desired locales.
// Initialize the desired locales.
JavascriptTimeAgo.locale(en);

// console.log = function () {};

ReactDOM.render(
  <Router basename="/react-news">
    <App feedsStore={feedsStore} />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
