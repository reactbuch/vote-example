import React from 'react/react';
import VoteSummary from './VoteSummary';
import VotingComponent from './VotingComponent';

export default function VoteList({ allVotes, currentVoteId, onSelectVote, onRegisterVote, onDismissVote }) {
  return (
    <div>
      {allVotes.map((vote) => {
        if (vote.id === currentVoteId) {
          return <VotingComponent key={vote.id}
                                  vote={vote}
                                  onDismissVote={()=>{onDismissVote(vote)}}
                                  onRegisterChoice={(choice)=>{onRegisterVote(vote, choice)}}
          />
        }
        return <VoteSummary key={vote.id} vote={vote} onActivate={()=>{onSelectVote(vote)}}/>;
      })}
    </div>
  );
}

VoteList.propTypes = {
  allVotes:       React.PropTypes.array.isRequired,
  currentVoteId:  React.PropTypes.string,
  onSelectVote:   React.PropTypes.func.isRequired,
  onRegisterVote: React.PropTypes.func.isRequired,
  onDismissVote:  React.PropTypes.func.isRequired
};
