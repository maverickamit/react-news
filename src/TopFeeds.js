import React, { useState, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import "./FeedPage.css";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import { getFeedListing } from "./requests";
var Feed = require("rss-to-json");
var striptags = require("striptags");
var he = require("he");

function TopFeeds({ feedsStore }) {
  const feeds = [
    "https://null-byte.wonderhowto.com/rss.xml",
    "https://feeds.feedburner.com/TheHackersNews",
    "http://feeds.feedburner.com/eset/blog/",
    "https://www.phoronix.com/rss.php",
    "https://www.anandtech.com/rss/",
    "https://wccftech.com/feed/",
    "https://www.techworm.net/feed",
    "https://krebsonsecurity.com/feed/",
    "https://www.washingtonexaminer.com/tag/technology.rss",
    "https://thewirecutter.com/feed/",
    "https://www.theinquirer.net/feeds/rss",
    "https://risky.biz/rss.xml",
    "https://cxsecurity.com/wlb/rss/exploit/",
    "http://seclists.org/rss/fulldisclosure.rss",
    "http://feeds.feedburner.com/securityweekly/",
    "https://www.deepdotweb.com/feed/",
    "http://feeds.macrumors.com/MacRumors-All",
    "https://9to5mac.com/feed/",
    "https://feeds.feedburner.com/neowin-main",
    "https://securelist.com/feed/",
    "https://www.xda-developers.com/feed/",
    "https://www.eff.org/rss/updates.xml",
    "https://www.onmsft.com/feed",
    "https://fossbytes.com/feed/",
    "https://www.bleepingcomputer.com/feed/",
    "https://www.ghacks.net/feed/",
    "http://feeds.feedburner.com/TheHackersNews",
    "https://nakedsecurity.sophos.com/feed/",
    "http://www.zdnet.com/blog/security/rss.xml",
    "http://securityaffairs.co/wordpress/feed",
    "https://www.darkreading.com/rss_simple.asp",
    "https://www.extremetech.com/computing/feed",
    "http://feeds.twit.tv/brickhouse_video_hd.xml",
    "https://www.welivesecurity.com/feed/",
    "https://www.techrepublic.com/rssfeeds/articles/",
    "http://feeds.feedburner.com/TechCrunch/",
    "http://www.computerworld.com/news/index.rss",
    "https://www.extremetech.com/feed",
    "http://www.techradar.com/rss",
    "https://readwrite.com/feed/",
    "https://www.theguardian.com/us/technology/rss",
    "https://www.linuxinsider.com/perl/syndication/rssfull.pl",
    "http://lxer.com/module/newswire/headlines.rss",
    "https://feeds.feedburner.com/CoinDesk",
    "https://cointelegraph.com/rss",
    "https://www.theverge.com/rss/index.xml",
    "https://www.theregister.co.uk/headlines.atom",
    "https://threatpost.com/feed/",
    "http://feeds.arstechnica.com/arstechnica/index/",
    "http://feeds.reuters.com/reuters/technologyNews",
    "https://www.anandtech.com/rss/",
    "https://www.guru3d.com/news_rss",
    "http://rss.slashdot.org/Slashdot/slashdotMain",
    "https://feeds.feedburner.com/Torrentfreak",
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
                    {he.decode(
                      striptags(li.description).substring(0, 150) + "..."
                    )}
                  </Card.Text>
                  <Card.Text className="time-ago">
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
