import React from 'react/react';
import VoteSummary from './VoteSummary';
import VotingComponent from './VotingComponent';

// FIXME
// unfortunately, if you have a stateless component, ReactTestUtils can not properly render it
// temporarily we make this an ordinary component
// need to wait until this
// https://github.com/facebook/react/issues/4913
// is released then revert to stateless component
export default class VoteList extends React.Component {
  render() {
    const { allVotes, currentVoteId} = this.props;
    return (
      <div>
        {allVotes.map((vote) => {
          if (vote.id === currentVoteId) {
            return <VotingComponent key={vote.id}
                                    vote={vote}
            />
          }
          return <VoteSummary key={vote.id} vote={vote}/>;
        })}
      </div>
    );
  }
}
VoteList.propTypes = {
  allVotes:      React.PropTypes.array.isRequired,
  currentVoteId: React.PropTypes.string
};
