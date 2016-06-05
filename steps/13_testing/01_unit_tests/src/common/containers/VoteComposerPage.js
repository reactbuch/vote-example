import React, { PropTypes } from 'react';
import VoteComposer from './../components/VoteComposer';

function VoteComposerPage({setTitle, routeToMain, addVote}) {
  setTitle('Compose - Vote as a Service');
  return (
    <VoteComposer
      active={true}
      onDeactivate={routeToMain}
      onSave={addVote}
    />
  );
}
VoteComposerPage.propTypes = {
  setTitle:    PropTypes.func.isRequired,
  routeToMain: PropTypes.func.isRequired,
  addVote:     PropTypes.func.isRequired
};

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(null, mapDispatchToProps)(VoteComposerPage);
