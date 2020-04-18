import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getFeedListing } from "./requests";

function TopFeeds() {
  const feeds = [
    { name: "ABC News", url: "https://abcnews.go.com/abcnews/topstories" },
    { name: "BBC News", url: "http://feeds.bbci.co.uk/news/rss.xml" },
    { name: "The Intercept", url: "https://theintercept.com/feed/?lang=en" },
    { name: "Al Jazeera", url: "http://www.aljazeera.com/xml/rss/all.xml" },
    { name: "UPI News", url: "http://rss.upi.com/news/top_news.rss" },
    { name: "Newsday", url: "http://www.newsday.com/cmlink/1.1284874" },
  ];
  const [allListings, setListings] = useState([]);
  const [data, setData] = useState({});

  const urls = [];
  feeds.map((feed) => {
    urls.push(feed.url);
  });
  console.log(urls);
  var Feed = require("rss-to-json");
  const list = [];

  const getListings = async (url) => {
    try {
      Feed.load(
        "https://cors-anywhere.herokuapp.com/theintercept.com/feed/?lang=en",
        function (err, rss) {
          list.push(rss.items);
        }
      );
    } catch (ex) {
      console.log(ex);
    }
  };
  urls.map((url) => {
    getListings(url);
    console.log(list);
  });
  //   getListings("https://abcnews.go.com/abcnews/topstories");

  console.log("End of process");
  return (
    <div className="feed-page">
      <p>Hello World!</p>
    </div>
  );
}
export default withRouter(observer(TopFeeds));
