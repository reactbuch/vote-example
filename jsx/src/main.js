import React from 'react';
import ReactDOM from 'react-dom';

function Title(props) {
  return <h1>{props.label}</h1>;
}
function Header() {
  return <div className='header'><Title label='Hello, World' /></div>;
}

function Danger() {
  const potentialRisk = '<b>This is raw HTML</b>';
  const html = { __html: potentialRisk };

  return <ul>
    <li>Danger: {potentialRisk}</li>
    <li>Dangerously: <span dangerouslySetInnerHTML={html} /></li>
  </ul>

}

function Page() {
  return <div>
    <Header />
    <Danger />
  </div>
}

ReactDOM.render(<Page />, document.getElementById('mountPoint'));
