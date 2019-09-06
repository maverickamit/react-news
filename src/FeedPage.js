import React, { useState, useEffect } from "react";
import "./FeedPage.css";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
const querystring = require("querystring");

function FeedPage({ feedsStore, location }) {
  const [initialized, setInitialized] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!initialized) {
      setUrl(querystring.decode(location.search)["?url"]);
      setInitialized(true);
    }
  });

  return (
    <div className="feed-page">
      <h1 className="center title">RSS Feed: {url}</h1>
    </div>
  );
}
export default withRouter(observer(FeedPage));
