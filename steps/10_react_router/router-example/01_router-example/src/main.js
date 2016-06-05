import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import { About, Home } from './components';

const history = createHashHistory({
  queryKey: false
});

const router = <Router history={history}>
  <Redirect from='/' to='/home' />
  <Route path='/home' component={Home} />
  <Route path='/about' component={About} />
</Router>;


// Render application
ReactDOM.render(
  router,
  document.getElementById('appMountPoint')
);









