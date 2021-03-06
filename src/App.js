import React from "react";
import { Route } from "react-router-dom";
import SettingsPage from "./SettingsPage";
import "./App.css";
import TopBar from "./TopBar";
import TopFeeds from "./TopFeeds";
import { observer } from "mobx-react";

function App({ feedsStore }) {
  return (
    <div
      className={
        feedsStore.darkmode != true ? "app bg-white" : "app bg-dark text-light"
      }
    >
      <TopBar feedsStore={feedsStore} />
      <Route
        path="/"
        exact
        component={(props) => <TopFeeds {...props} feedsStore={feedsStore} />}
      />
      <Route
        path="/settings"
        exact
        component={(props) => (
          <SettingsPage {...props} feedsStore={feedsStore} />
        )}
      />
    </div>
  );
}
export default observer(App);
