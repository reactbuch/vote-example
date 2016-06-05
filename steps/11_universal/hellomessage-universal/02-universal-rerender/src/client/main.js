import React from 'react';
import ReactDOM from 'react-dom';

import HelloMessage from '../common/HelloMessage';

const greeting = 'World';
var mountNode = document.getElementById('mount');
ReactDOM.render(<HelloMessage greeting={greeting}/>, mountNode);
