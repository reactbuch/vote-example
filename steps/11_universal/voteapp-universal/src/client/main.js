import 'babel-polyfill';

// React
import React from 'react';
import ReactDOM from 'react-dom';

import routes from '../common/routes';

import { Router } from 'react-router';

import votesCache from '../common/votesCache';

votesCache.populate(window.__INITIAL_STATE__);

import createHistory from 'history/lib/createBrowserHistory';
const history = createHistory();

const router = <Router history={history}>
 { routes }
</Router>;

const mount = document.getElementById('voteAppMountPoint');
ReactDOM.render(router, mount);