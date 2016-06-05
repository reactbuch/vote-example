// React
import React from 'react';
import ReactDOM from 'react-dom';

class Form extends React.Component {
  onTextChange(e) {
    console.log(`Set ${e.target.name} to ${e.target.value}`);
    
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const currentState = this.state || {};
    return <div>
      <input type='text'
             name='person'
             value={currentState.currentText}
             onChange={e=>this.onTextChange(e)}
      />
      <input type='text'
             name='address'
             value={currentState.currentText}
             onChange={e=>this.onTextChange(e)}
      />
    </div>;
  }
}

// Render application
ReactDOM.render(
  <Form />,
  document.getElementById('examplesMountPoint')
);






