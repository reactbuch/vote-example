import React from 'react';
import { Route, Redirect} from 'react-router';

import Layout from './components/Layout';
import VotePage from './containers/VotePage';
import SingleVotePage from './containers/SingleVotePage';
import VoteComposerPage from './containers/VoteComposerPage';
import LoginPage from './containers/LoginPage';
import NoMatchPage from './containers/NoMatchPage';

// XXX will not work on server, as it creates a store per request
// (does not matter much, as this compose is never rendered on server side)
import store from './store/store';

function requireAuth(nextState, replaceState) {
  const state = store.getState();
  if (!state.login) {
    const redirect = nextState.location.pathname;
    replaceState(null, `/login${redirect}`);
  }
}

const routes = <Route>
  <Redirect from="/" to="/votes"/>
  <Route path="/" component={Layout}>
    <Route path="votes" component={VotePage}/>
    <Route path="votes/:id" component={SingleVotePage}/>
    <Route path="login(/:redirect)" component={LoginPage}/>
    <Route path="compose" component={VoteComposerPage} onEnter={requireAuth}/>
    <Route path="*" component={NoMatchPage}/>
  </Route>
</Route>;

export default routes;