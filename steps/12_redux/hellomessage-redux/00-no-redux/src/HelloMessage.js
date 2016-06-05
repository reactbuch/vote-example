import React from 'react';

export default class HelloMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {greeting: this.props.greeting};
  }

  resetGreeting() {
    this.setState({greeting: ''});
  }

  updateGreeting(greeting) {
    this.setState({
      greeting
    });
  }

  render() {
    const { greeting } = this.state;
    return <div>
      <input onChange={event => this.updateGreeting(event.target.value)}
             value={greeting}/>
      <p>Hello, {greeting}</p>
      <button
        onClick={() => this.resetGreeting() }>
        Clear
      </button>
    </div>;
  }
}
