// React
import React from 'react';
import ReactDOM from 'react-dom';

// wrong: no key attribute => will display error in console!
function List({items}) {
  return <ul>
    {items.map(i => <li>{i}</li>)}
  </ul>;
}

// Render application
ReactDOM.render(
  <List items={['Eins', 'Zwei', 'Drei']}/>,
  document.getElementById('examplesMountPoint')
);






