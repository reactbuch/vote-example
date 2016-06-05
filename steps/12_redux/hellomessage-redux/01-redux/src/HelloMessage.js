import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from './actions';

class HelloMessage extends React.Component {
  render() {
    const { greeting, updateGreeting, resetGreeting } = this.props;

    return <div>
      <input onChange={event => updateGreeting(event.target.value)}
             value={greeting}/>
      <p>Hello, {greeting}</p>
      <button
        onClick={() => resetGreeting()}>
        Clear
      </button>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    greeting: state.greeting
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloMessage);
