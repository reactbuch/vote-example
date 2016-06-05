// React
import React from 'react';
import ReactDOM from 'react-dom';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  submitLoginForm() {
    if (!this.loginForm) {
      // Nicht gemounted
      return;
    }
    
    const formData = new FormData(this.loginForm);
    
    // Zur zur Demonstration: (funktioniert nur, wenn ein Server laeuft...)
    fetch('/api/user', {
      method: 'POST',
      body: formData   
    }).then(r => console.log(r))
      .catch(err => console.error(err));
  }

  render() {
    return <form ref={f => this.loginForm = f}>
      Username:
      <input type='text'
             value={this.state.username}
             onChange={(e)=>this.setState({username: e.target.value })}
      />

      <input type='password'
             value={this.state.password}
             onChange={(e)=>this.setState({password: e.target.value })}
      />

      <button onClick={e => { e.preventDefault(); this.submitLoginForm()} }>Login</button>
    </form>;
  }
}

// Render application
ReactDOM.render(
  <LoginForm />,
  document.getElementById('examplesMountPoint')
);

