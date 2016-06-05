import React from 'react';

export default class HelloMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {greeting: this.props.greeting};
  }

  updateModel(event) {
    this.setState({greeting: event.target.value});
  }

  render() {
    return (
      <div>
        <input onChange={e => this.updateModel(e) }
               value={this.state.greeting}/>
        <p>Hello, {this.state.greeting}</p>
      </div>);
  }
}
