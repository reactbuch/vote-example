// React
import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/Layout';

import VoteController from './components/VoteController';
import SingleVoteController from './components/SingleVoteController';
import VoteComposerController from './components/VoteComposerController';
import LoginController from './components/LoginController';
import NoMatch from './components/NoMatch';

import { Router, Route, Redirect } from 'react-router';

import createHistory from 'history/lib/createHashHistory';
//https://rackt.github.io/history/stable/HashHistoryCaveats.html
const history = createHistory({queryKey: false});

const router = <Router history={history}>
  <Redirect from="/" to="/votes"/>
  <Route path="/" component={Layout}>
    <Route path="votes" component={VoteController}/>
    <Route path="votes/:id" component={SingleVoteController}/>
    <Route path="login(/:redirect)" component={LoginController}/>
    <Route path="compose" component={VoteComposerController} onEnter={LoginController.requireAuth}/>
    <Route path="*" component={NoMatch}/>
  </Route>
</Router>;

const mount = document.getElementById('voteAppMountPoint');
ReactDOM.render(router, mount);
