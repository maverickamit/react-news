import React from 'react';

import { Router, Route } from 'react-router-dom';
import HomePage from './HomePage';

import { createBrowserHistory as createHistory } from 'history';
import './App.css';
import TopBar from './TopBar';
import FeedPage from './FeedPage';
import TopFeeds from './TopFeeds';

import SettingsPage from './SettingsPage';

import { observer } from 'mobx-react';
const history = createHistory();

function App({ feedsStore }) {
	return (
		<div className={feedsStore.darkmode != true ? 'app bg-white' : 'app bg-dark text-light'}>
			<Router history={history}>
				<TopBar feedsStore={feedsStore} />
				<Route path="/" exact component={(props) => <TopFeeds {...props} feedsStore={feedsStore} />} />
				<Route
					path="/settings"
					exact
					component={(props) => <SettingsPage {...props} feedsStore={feedsStore} />}
				/>
			</Router>
		</div>
	);
}
export default observer(App);
