import React from 'react';
import ReactDOM from 'react-dom';

import HelloMessage from './HelloMessage';

const greeting = 'World';
const mountNode = document.getElementById('mount');
ReactDOM.render(<HelloMessage greeting={greeting}/>, mountNode);
