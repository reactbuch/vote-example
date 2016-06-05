import React from 'react';
import VotingComponent from './VotingComponent';
import {fetchJson, sendJson} from '../backend/Backend';

import votesCache from '../votesCache';

export default class SingleVoteController extends React.Component {
  constructor() {
    super();
    this.registerVote = this.registerVote.bind(this);
    this.routeToMain = this.routeToMain.bind(this);
    this.state = {
      vote: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.loadVote(nextProps);
  }

  componentWillMount() {
    if (votesCache.currentVote) {
      this.updateCurrentVote(votesCache.currentVote);
      // just use the data from server for initial rendering to be always up to date
      votesCache.reset();
    } else {
      this.loadVote(this.props);
    }
  }

  loadVote(props) {
    const requestedVoteId = props.params.id;
    if (!requestedVoteId || (this.state.vote && this.state.vote.id === requestedVoteId)) {
      return;
    }
    fetchJson(`/api/votes/${requestedVoteId}`).then(vote => {
      this.updateCurrentVote(vote);
    });
  }

  updateCurrentVote(vote) {
    if (typeof document !== 'undefined') document.title = `${vote.title} - Vote as a Service`;
    this.setState({
      vote
    });
  }

  registerVote(vote, choice) {
    sendJson('put', `/api/votes/${vote.id}/choices/${choice.id}/vote`, {}).then(() => this.routeToMain());
  }

  transitionTo(path) {
    this.context.history.pushState(null, path);
  }

  routeToMain() {
    this.transitionTo('/');
  }

  render() {
    const {vote} = this.state;
    if (vote) {
      return <VotingComponent vote={vote}
                              onDismissVote={this.routeToMain}
                              onRegisterChoice={(choice)=>{this.registerVote(vote, choice)}}
      />;
    } else {
      return null;
    }
  }
}
SingleVoteController.contextTypes = {
  history: React.PropTypes.object.isRequired
};
