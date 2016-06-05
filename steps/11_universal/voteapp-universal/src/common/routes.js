import React from 'react';
import { Route, Redirect } from 'react-router';

import Layout from './components/Layout';
import VoteController from './components/VoteController';
import SingleVoteController from './components/SingleVoteController';
import VoteComposerController from './components/VoteComposerController';
import LoginController from './components/LoginController';
import NoMatch from './components/NoMatch';

const routes = <Route>
  <Redirect from="/" to="/votes" />
  <Route path="/" component={Layout}>
    <Route path="votes" component={VoteController}/>
    <Route path="votes/:id" component={SingleVoteController} />
    <Route path="login(/:redirect)" component={LoginController}/>
    <Route path="compose" component={VoteComposerController} onEnter={LoginController.requireAuth} />
    <Route path="*" component={NoMatch}/>
  </Route>
</Route>;

export default routes;