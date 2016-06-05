// React
import React from 'react';
import ReactDOM from 'react-dom';

class TimerComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }
  
  componentDidMount() {
    // Start des Timers unmittelbar nach dem Einhaengen in den DOM
    this.toggleTimer();
    
  }

  toggleTimer() {
    if (this.timerId) {
      // Timer läuft: anhalten
      clearInterval(this.timerId);
      this.timerId = 0;
      return;
    }
    // Timer starten
    // Id des Timers wird als Instanz-Variable gespeichert
    this.timerId = setInterval(() => {
      this.setState({count: this.state.count + 1});
    }, 500);
  }

  render() {
    return <div onClick={()=>this.toggleTimer()}>
      Zähler: {this.state.count}
    </div>;
  }
}

// Render application
ReactDOM.render(
  <TimerComponent />,
  document.getElementById('examplesMountPoint')
);






