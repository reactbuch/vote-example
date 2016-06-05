// React
import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/Layout';
import VotingComponent from './components/VotingComponent';

// Sample data
const vote = {
  title:       'How is your day?',
  description: 'Tell me: how has your day been so far?',
  choices:     [
    {id: 'choice_1', title: 'Good', count: 7},
    {id: 'choice_2', title: 'Bad', count: 12},
    {id: 'choice_3', title: 'Not sure yet', count: 1}
  ]
};

const mainComponent = <VotingComponent vote={vote}/>;

// Render application
ReactDOM.render(
  <Layout>{mainComponent}</Layout>,
  document.getElementById('voteAppMountPoint')
);









