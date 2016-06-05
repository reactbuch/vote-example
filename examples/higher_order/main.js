import React from 'react';
import ReactDOM from 'react-dom';

import HelloMessage from './HelloMessage';

var mountNode = document.getElementById('examplesMountPoint');
ReactDOM.render(<HelloMessage model="Hello" log={true}/>, mountNode);
