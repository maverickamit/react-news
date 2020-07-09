import React from 'react';

import { Router, Route } from 'react-router-dom';
import HomePage from './HomePage';

import './App.css';
import TopBar from './TopBar';
import FeedPage from './FeedPage';
import TopFeeds from './TopFeeds';

import SettingsPage from './SettingsPage';

import { observer } from 'mobx-react';

function App({ feedsStore }) {
	return (
		<div className={feedsStore.darkmode != true ? 'app bg-white' : 'app bg-dark text-light'}>
			<TopBar feedsStore={feedsStore} />
			<Route path="/" exact component={(props) => <TopFeeds {...props} feedsStore={feedsStore} />} />
			<Route path="/settings" exact component={(props) => <SettingsPage {...props} feedsStore={feedsStore} />} />
		</div>
	);
}
export default observer(App);
