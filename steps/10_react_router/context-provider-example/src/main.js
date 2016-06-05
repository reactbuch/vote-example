import React from 'react';
import ReactDOM from 'react-dom';

import ModelProvider from './ModelProvider';
import Page from './components';

const app = <ModelProvider>
  <Page />
</ModelProvider>;

// Render application
ReactDOM.render(
  app,
  document.getElementById('appMountPoint')
);









