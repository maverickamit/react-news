import React, { useState, useEffect, Component } from "react";
import "./FeedPage.css";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getFeedListing } from "./requests";
const axios = require("axios");

function TopFeeds({ feedsStore }) {
  const feeds = [
    { name: "ABC News", url: "abcnews.go.com/abcnews/topstories" },
    { name: "BBC News", url: "feeds.bbci.co.uk/news/rss.xml" },
    { name: "The Intercept", url: "theintercept.com/feed/?lang=en" },
    { name: "Al Jazeera", url: "www.aljazeera.com/xml/rss/all.xml" },
    { name: "UPI News", url: "rss.upi.com/news/top_news.rss" },
    { name: "Newsday", url: "www.newsday.com/cmlink/1.1284874" },
  ];
  const [initialized, setInitialized] = useState(false);
  const [allListings, setListings] = useState([]);
  const [data, setData] = useState({});

  const urls = [];
  feeds.map((feed) => {
    urls.push(feed.url);
  });
  var Feed = require("rss-to-json");
  const list = [];
  const getListing = async (url) => {
    await Feed.load("http://localhost:5000/" + url, function (err, rss) {
      list.push(rss.items);
      setListings(list.flat());
    });
  };

  const getListings = (urls) => {
    urls.map((url) => {
      getListing(url);
    });
  };

  useEffect(() => {
    if (!initialized) {
      getListings(urls);
      console.log("hi");
    }
    setInitialized(true);
  }, [initialized]);

  const openLink = (url) => {
    window.location.href = url;
  };

  return (
    <div className="feed-page">
      {allListings
        .sort((item1, item2) => {
          var d1 = item1.created;
          var d2 = item2.created;
          return d2 - d1;
        })
        .map((li, i) => {
          return (
            <Card key={i}>
              <Card.Title className="card-title">{li.title}</Card.Title>
              <Card.Body>
                <p>
                  {li.description
                    .replace("<p>", "")
                    .replace(/<img .*?>/g, "")
                    .split(".")[0] + "..."}
                </p>
                <p>{li.pubDate}</p>
                {/* <p>{l.content}</p> */}
                <Button
                  variant="primary"
                  onClick={openLink.bind(this, li.link)}
                >
                  Open
                </Button>{" "}
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
}

export default withRouter(observer(TopFeeds));
