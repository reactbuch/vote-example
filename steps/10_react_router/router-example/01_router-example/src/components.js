import React from 'react';

import { Link } from 'react-router';

export function Home() {
  return <div>
    <h1>Home</h1>
    <p>Welcome to our little React Router Example.</p>
    <Link to='/about'>More about us</Link>
  </div>;
}

export function About() {
  return <div><h1>About</h1>
    <Link to='/'>Back home</Link>
  </div>;
}
