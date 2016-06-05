// React
import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/Layout';
import VoteController from './components/VoteController';

const mainComponent = <VoteController />;

// Render application
ReactDOM.render(
  <Layout>{mainComponent}</Layout>,
  document.getElementById('voteAppMountPoint')
);









