// React
import React from 'react';
import ReactDOM from 'react-dom';

function Button({label, onClickHandler}) {
  return <div onClick={onClickHandler}>{label}</div>
}
Button.propTypes = {
  label:          React.PropTypes.string.isRequired,
  onClickHandler: React.PropTypes.func.isRequired
};

class Controller extends React.Component {
  constructor() {
    super();
    this.state = {counter: 0};
  }

  incrementCounter() {
    this.setState({counter: this.state.counter + 1})
  }

  render() {
    return <Button
      label={`Click to increment: ${this.state.counter}`}
      onClickHandler={ () => this.incrementCounter() }
    />;
  }
}

// Render application
ReactDOM.render(
  <Controller />,
  document.getElementById('examplesMountPoint')
);






