import React from 'react';
import VoteList from './VoteList';
import VoteComposer from './VoteComposer';
import {fetchJson} from '../backend/Backend';

import votesCache from '../votesCache';

export default class VoteController extends React.Component {
  constructor() {
    super();

    this.state = {
      allVotes: []
    };

    this.activateVoteComposer = this.activateVoteComposer.bind(this);
  }

  // componentWillMount is the only life cycle method that will be called on server rendering
  componentWillMount() {
    if (typeof document !== 'undefined') document.title = 'Overview - Vote as a Service';
    if (votesCache.votes) {
      this.updateVotes(votesCache.votes);
      // just use the data from server for initial rendering to be always up to date
      votesCache.reset();
    } else {
      fetchJson('/api/votes').then(votes => {
        this.updateVotes(votes);
      });
    }
  }

  updateVotes(allVotes) {
    this.setState({
      allVotes
    });
  }

  transitionTo(path) {
    this.context.history.pushState(null, path);
  }

  activateVoteComposer() {
    this.transitionTo('/compose');
  }

  render() {
    const { allVotes } = this.state;

    return (
      <div>
        <VoteList allVotes={allVotes} />
        <VoteComposer active={false}
                      onActivate={this.activateVoteComposer} />
      </div>
    );
  }
}
VoteController.contextTypes = {
    history: React.PropTypes.object.isRequired
};
