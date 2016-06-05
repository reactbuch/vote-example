import React, { PropTypes } from 'react';
import VotingComponent from './../components/VotingComponent';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SingleVotePage extends React.Component {

  componentDidMount() {
    this.props.loadVote(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.loadVote(nextProps.params.id);
    }
  }

  render() {
    const { currentVote, setTitle, routeToMain, registerVote } = this.props;
    if (currentVote) {
      setTitle(`${currentVote.title} - Vote as a Service`);
      return <VotingComponent vote={currentVote}
                              onDismissVote={routeToMain}
                              onRegisterChoice={(choice)=>{registerVote(currentVote, choice)}}
      />;
    } else {
      setTitle(`Vote ${this.props.params.id} - Vote as a Service`);
      return null;
    }
  }
}
SingleVotePage.propTypes = {
  currentVote: PropTypes.object,
  setTitle: PropTypes.func.isRequired,
  routeToMain: PropTypes.func.isRequired,
  registerVote: PropTypes.func.isRequired,
  loadVote: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

import * as Actions from '../actions';

function mapStateToProps(state) {
  return {
    currentVote: state.currentVote
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleVotePage);
