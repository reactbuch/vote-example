import React from 'react';

// Demonstration: Receiving new properties will not change the state
export default class TimerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimerIfRunning();
  }

  stopTimerIfRunning() {
    if (this.timerId) {
      // Timer läuft: anhalten
      clearInterval(this.timerId);
      delete this.timerId;
      return;
    }
  }

  startTimer() {
    // Timer starten
    // Id des Timers wird als Instanz-Variable gespeichert
    this.timerId = setInterval(() => {
      this.setState({count: this.state.count + 1});
    }, 1000);
  }

  render() {
    return <ul>
      <li>Time (from props): {this.props.time}</li>
      <li>Count (from state): {this.state.count}</li>
    </ul>;
  }
}
