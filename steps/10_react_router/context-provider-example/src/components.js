import React from 'react';

// Greeting wants to display the current user
// and gets access to it via context
function Greeting(props, context) {
  return <b>Welcome {context.model.user}!</b>
}
Greeting.contextTypes = {
  model: React.PropTypes.object.isRequired
};

function Header() {
  return <div><Greeting /></div>;
}

export default function Page() {
  return <div><Header /></div>
}
