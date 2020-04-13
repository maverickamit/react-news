import { observable, action, decorate } from "mobx";

class FeedsStore {
  feeds = [
    { name: "ABC News", url: "https://abcnews.go.com/abcnews/topstories" },
    { name: "BBC News", url: "http://feeds.bbci.co.uk/news/rss.xml" },
    { name: "The Intercept", url: "https://theintercept.com/feed/?lang=en" },
    { name: "Al Jazeera", url: "http://www.aljazeera.com/xml/rss/all.xml" },
    { name: "UPI News", url: "http://rss.upi.com/news/top_news.rss" },
    { name: "Newsday", url: "http://www.newsday.com/cmlink/1.1284874" },
  ];
  feed = "";
  

  setFeeds(feeds) {
    this.feeds = feeds;
    
  }

  setSelectedFeed(feed) {
    this.feed = feed;
  }
}

FeedsStore = decorate(FeedsStore, {
  feeds: observable,
  feed: observable,
  setFeeds: action,
  setSelectedFeed: action,
});

export { FeedsStore };
