import React, { useState, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import "./FeedPage.css";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import { getFeedListing } from "./requests";
var Feed = require("rss-to-json");

function TopFeeds({ feedsStore }) {
  const feeds = [
    "https://abcnews.go.com/abcnews/topstories",
    "http://feeds.bbci.co.uk/news/rss.xml",
    "https://theintercept.com/feed/?lang=en",
    "http://www.aljazeera.com/xml/rss/all.xml",
    "http://rss.upi.com/news/top_news.rss",
    "http://www.newsday.com/cmlink/1.1284874",
    "http://www.ibtimes.com/rss",
    "http://rss.nytimes.com/services/xml/rss/nyt/World.xml",
    "http://rss.nytimes.com/services/xml/rss/nyt/US.xml",
    "http://feeds.feedburner.com/NewshourHeadlines?format=xml",
    "http://www.npr.org/rss/rss.php?id=1001",
    "http://feeds.bbci.co.uk/news/rss.xml",
    "http://www.tmz.com/category/politix/rss.xml",
    "http://nypost.com/news/feed/",
    "http://feeds.reuters.com/Reuters/domesticNews",
    "http://feeds.reuters.com/Reuters/worldNews",
    "https://www.theguardian.com/world/rss",
    "https://www.theguardian.com/us-news/rss",
    "http://feeds.abcnews.com/abcnews/topstories",
    "http://feeds.foxnews.com/foxnews/latest",
    "http://feeds2.feedburner.com/time/topstories",
    "http://feeds.marketwatch.com/marketwatch/topstories/",
    "https://www.dailymail.co.uk/ushome/index.rss",
    "https://www.dailymail.co.uk/news/index.rss",
    "http://www.espn.com/espn/rss/news",
    "https://www.newyorker.com/feed/news",
    "https://www.thesun.co.uk/feed/",
    "https://thehill.com/rss/syndicator/19109",
    "https://thehill.com/rss/syndicator/19110",
    "https://www.pbs.org/newshour/feeds/rss/headlines",
    "https://www.washingtonexaminer.com/tag/news.rss",
    "https://www.cbsnews.com/latest/rss/main",
  ];
  const [initialized, setInitialized] = useState(false);
  const [allListings, setListings] = useState([]);

  let list = [];
  const getListing = async (feed) => {
    await Feed.load("http://localhost:5000/" + feed, function (err, rss) {
      if (err) {
        console.log("error" + feed);
      } else {
        rss.items.map((item) => (item.sourceName = rss.title));
        list.push(rss.items);
        setListings(list.flat());
        console.log(rss.title);
      }
    });
  };

  const getListings = () => {
    feeds.map(async (feed) => {
      await getListing(feed);
      list = [];
      console.log("I am updating");
    });
  };

  const updateListings = () => {
    setInterval(() => {
      getListings();
    }, 600000);
  };

  useEffect(() => {
    if (!initialized) {
      getListings();
      updateListings();
    }
    setInitialized(true);
  }, [initialized]);

  const openLink = (url) => {
    window.location.href = url;
  };

  if (allListings.length === 0) {
    return (
      <div className="feed-page">
        <h2>Loading!</h2>
      </div>
    );
  }

  return (
    <div className="feed-page">
      {allListings
        .sort((item1, item2) => {
          var d1 = new Date(item1.pubDate).getTime();
          var d2 = new Date(item2.pubDate).getTime();
          return d2 - d1;
        })
        .splice(0, 100)
        .map((li, i) => {
          if (li.pubDate !== undefined) {
            return (
              <Card key={i}>
                <Card.Header className="card-title">{li.title}</Card.Header>

                <Card.Body>
                  <Card.Text>
                    {li.description
                      .replace("<p>", "")
                      .replace(/<img .*?>/g, "")
                      .substring(0, 150) + "..."}
                  </Card.Text>
                  <Card.Text>
                    <span>
                      <ReactTimeAgo date={new Date(li.pubDate)} />
                      <span>{`  from ${li.sourceName}`}</span>
                    </span>
                  </Card.Text>
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
          }
        })}
    </div>
  );
}

export default withRouter(observer(TopFeeds));
