import React, { PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
    this.state = {
      email: null
    };
  }

  login() {
    this.props.login(this.state.email);
    this.redirect();
  }

  redirect() {
    const destination = `/${this.props.params.redirect ? this.props.params.redirect : ''}`;
    // we do not want login in our history
    this.props.replacePath(destination);
  }

  onChange(event) {
    const email = event.target.value;
    this.setState({
      email
    });
  }

  isValidEmail() {
    // to validate email we could use joi (only put this in an info box)
    return this.state.email;
  }

  render() {
    this.props.setTitle('Login - Vote as a Service');
    return <div className="Row VotesRow">
      <div className="Head">
        <h1 className="Title">You need to login to perform that action</h1>
      </div>

      <div className="LoginForm">
        <input type="text"
               placeholder="Enter your email address here"
               value={this.state.email}
               onChange={this.onChange} />
        <div className="ButtonBar">
          <a className={this.isValidEmail() ? 'Button' : 'Button disabled'}
             onClick={this.isValidEmail() ? this.login : null}>Login</a>
          <a className="Button" onClick={this.props.routeToMain}>Cancel</a>
        </div>
      </div>
    </div>;
  }
}
LoginPage.propTypes = {
  setTitle: PropTypes.func.isRequired,
  routeToMain: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  replacePath: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

import * as Actions from '../actions';

function mapStateToProps(state) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
