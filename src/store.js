import {
  observable,
  action,
  decorate
} from "mobx";

class FeedsStore {
  feeds = ["Hello"];
  feed = "";
  darkmode = false;

  setFeeds(feeds) {
    this.feeds = feeds;
  }

  setSelectedFeed(feed) {
    this.feed = feed;
  }

  setDarkMode(darkmode) {
    this.darkmode = darkmode;
  }
}

FeedsStore = decorate(FeedsStore, {
  feeds: observable,
  feed: observable,
  darkmode: observable,
  setDarkMode: action,
  setFeeds: action,
  setSelectedFeed: action,
});

export {
  FeedsStore
};