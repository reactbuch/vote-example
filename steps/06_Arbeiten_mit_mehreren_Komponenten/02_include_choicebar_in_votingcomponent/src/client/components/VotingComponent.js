import React from 'react';
import ChoiceBar from './ChoiceBar.js';

export default class VotingComponent extends React.Component {
  render() {
    const { vote } = this.props;
    return (
      <div className="Row VotingRow Spacer">
        <div className="Head">
          <h1 className="Title">{vote.title}
            <div className="Badge">{vote.totalVotes} Votes</div>
          </h1>
          <div className="Description Emphasis">{vote.description}</div>
        </div>
        <div>
          {vote.choices.map(choice => <ChoiceBar key={choice.id} {...choice} />)}
        </div>
      </div>
    );
  }
}

VotingComponent.propTypes = {
  vote: React.PropTypes.object.isRequired
};


