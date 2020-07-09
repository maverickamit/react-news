import React, {
  useState,
  useEffect
} from "react";
import ReactTimeAgo from "react-time-ago";
import "./FeedPage.css";
import {
  observer
} from "mobx-react";
import {
  withRouter
} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import defaultFeeds from "./DefaultFeeds";
// import { getFeedListing } from "./requests";
var Feed = require("rss-to-json");
var striptags = require("striptags");
var he = require("he");
let Parser = require("rss-parser");
let parser = new Parser();
var _ = require("lodash");

function HomePage({
  feedsStore
}) {
  const [initialized, setInitialized] = useState(false);
  const [allListings, setListings] = useState([]);
  let list = [];
  const getListing = async (feed) => {
    await Feed.load("https://cors-anywhere.herokuapp.com/" + feed.url, function (err, rss) {
      if (err) {
        console.log("error" + feed);
      } else {
        rss.items.map((item) => (item.sourceName = rss.title));
        let newList = _.uniqBy(rss.items, "title");
        list.push(_.uniqBy(rss.items, "title"));
        newList = [];
        setListings(list.flat());
        console.log(newList);
      }
    });
  };

  const getListings = () => {
    const feeds = feedsStore.feeds;
    feeds.map(async (feed) => {
      await getListing(feed);
      list = [];
      console.log("I am updating");
    });
  };

  // const updateListings = () => {
  //   setInterval(() => {
  //     getListings();
  //   }, 600000);
  // };

  useEffect(() => {
    if (!initialized) {
      let rssFeeds = [];
      let color = "";
      try {
        rssFeeds = JSON.parse(localStorage.getItem("newsfeeds"));
        if (Array.isArray(rssFeeds)) {
          feedsStore.setFeeds(rssFeeds);
        } else {
          feedsStore.setFeeds(defaultFeeds);
        }
      } catch (ex) {
        console.log("error" + ex);
      }
      try {
        color = JSON.parse(localStorage.getItem("darkmode"));
        if (color == false || true) {
          feedsStore.setDarkMode(color);
          console.log(color);
        }
      } catch (ex) {
        console.log("error" + ex);
      }
      getListings();
      // updateListings();
    }
    setInitialized(true);
  }, [initialized]);

  const openLink = (url) => {
    window.open(url);
  };

  if (allListings.length === 0) {
    return ( <
      div className = "feed-page" >
      <
      h2 > Loading! < /h2>{" "} < /
      div >
    );
  }

  return ( <
      div className = "feed-page" > {
        " "
      } {
        allListings
          .sort((item1, item2) => {
            var d1 = new Date(item1.pubDate).getTime();
            var d2 = new Date(item2.pubDate).getTime();
            return d2 - d1;
          })
          .splice(0, 250)
          .map((li, i) => {
              if (li.pubDate != undefined) {
                return ( <
                    Card key = {
                      i
                    } >
                    <
                    Card.Header className = {
                      feedsStore.darkmode != true ?
                      "card-title" : "card-title bg-dark text-light "
                    } > {
                      " "
                    } {
                      li.title
                    } {
                      " "
                    } <
                    /Card.Header> <
                    Card.Body className = {
                      feedsStore.darkmode != true ? "" : "bg-dark"
                    } >
                    <
                    Card.Text > {
                      " "
                    } {
                      he.decode(
                        striptags(li.description).substring(0, 150) + "..."
                      )
                    } {
                      " "
                    } <
                    /Card.Text>{" "} <
                    Card.Text className = "time-ago" >
                    <
                    span >
                    <
                    ReactTimeAgo date = {
                      new Date(li.pubDate)
                    }
                    />{" "} <
                    span > {
                      `  from ${li.sourceName}`
                    } < /span>{" "} < /
                    span > {
                      " "
                    } <
                    /Card.Text>{" "} {
                    /* <p>{l.content}</p> */
                  } {
                    " "
                  } <
                  Button variant = {
                    feedsStore.darkmode != true ? "primary" : "info"
                  }
                onClick = {
                    openLink.bind(this, li.link)
                  } >
                  Open {
                    " "
                  } <
                  /Button>{" "} < /
                Card.Body > {
                    " "
                  } <
                  /Card>
              );
            }
          })
    } {
      " "
    } <
    /div>
);
}

export default withRouter(observer(HomePage));