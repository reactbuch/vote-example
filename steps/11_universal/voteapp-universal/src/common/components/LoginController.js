import React from 'react';

let loggedIn = false;

export default class LoginController extends React.Component {
  static requireAuth(nextState, replaceState) {
    if (!loggedIn) {
      const redirect = nextState.location.pathname;
      replaceState(null, `/login${redirect}`);
    }
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
    this.routeToMain = this.routeToMain.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
    this.state = {
      email: null
    };
  }

  // How and where to set title when routing to a component
  // https://github.com/rackt/react-router/issues/49#issuecomment-47164264
  // there are more fancy ways of doing this, but this is the most straight forward way
  componentDidMount() {
    document.title = 'Login - Vote as a Service';
  }

  login() {
    loggedIn = true;
    this.redirect();
  }

  redirect() {
    const destination = `/${this.props.params.redirect ? this.props.params.redirect : ''}`;
    // we do not want login in our history
    this.context.history.replaceState(null, destination);
  }

  onChange(event) {
    const email = event.target.value;
    this.setState({
      email
    });
  }

  routeToMain() {
    this.context.history.pushState(null, '/');
  }

  isValidEmail() {
    // to validate email we could use joi (only put this in an info box)
    return this.state.email;
  }

  render() {
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
          <a className="Button" onClick={this.routeToMain}>Cancel</a>
        </div>
      </div>
    </div>;
  }
}
LoginController.contextTypes = {
  history: React.PropTypes.object.isRequired
};
