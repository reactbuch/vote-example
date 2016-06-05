// React
import React from 'react';
import ReactDOM from 'react-dom';

function Wrapper({children}) {
  console.dir(children);
  return <div>
    {React.Children.map(children, c => <div>{c}</div>)}
  </div>;
}
Wrapper.propTypes = {
  children: React.PropTypes.any.isRequired
}


// Render application
ReactDOM.render(
  <Wrapper><p>Eins</p><p>Zwei</p></Wrapper>,
  document.getElementById('examplesMountPoint')
);






