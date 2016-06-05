import React from 'react';
import ChoiceBar from './ChoiceBar';

export default function VotingComponent({ vote, onDismissVote, onRegisterChoice }) {
  return (
    <div className="Row VotingRow Spacer">
      <div className="Head" onClick={onDismissVote}>
        <h1 className="Title">{vote.title}
          <div className="Badge">{vote.totalVotes} Votes</div>
        </h1>
        <div className="Description Emphasis">{vote.description}</div>
      </div>
      <div>
        {vote.choices.map((choice) =>
          <ChoiceBar key={choice.id}
                     onClickHandler={()=>onRegisterChoice(choice)}
            {...choice} />
        )}
      </div>
      <div className="ButtonBar">
        <div className="Button" onClick={onDismissVote}>Vote later</div>
      </div>
    </div>
  );
}

VotingComponent.propTypes = {
  vote:             React.PropTypes.object.isRequired,
  onDismissVote:    React.PropTypes.func.isRequired,
  onRegisterChoice: React.PropTypes.func.isRequired
};


