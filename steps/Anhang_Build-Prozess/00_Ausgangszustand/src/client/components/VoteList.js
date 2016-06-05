import React from 'react/react';
import VoteSummary from './VoteSummary';
import VotingComponent from './VotingComponent';

export default function VoteList({ allVotes, currentVoteId}) {
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

VoteList.propTypes = {
  allVotes:      React.PropTypes.array.isRequired,
  currentVoteId: React.PropTypes.string
};
