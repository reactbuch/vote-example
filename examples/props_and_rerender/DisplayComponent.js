import React from 'react';
import TimerComponent from './TimerComponent.js';

export default class DisplayComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTime: new Date().toLocaleTimeString()
    }
  }

  count() {
    this.setState({currentTime: new Date().toLocaleTimeString()});
  }

  render() {
    const { currentTime } = this.state;
    return <div>
      <button onClick={() => this.count()}>Click to send current time as new props to timer!</button>

      <TimerComponent time={currentTime}/>
    </div>;
  }
}