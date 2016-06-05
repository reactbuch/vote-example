import React from 'react';
import ChoiceBar from './ChoiceBar.js';

export default class VotingComponent extends React.Component {
  render() {
    const { vote } = this.props;
    const totalVotes = vote.choices.reduce((prev, curr) => prev + curr.count, 0);
    return (
      <div className="Row VotingRow Spacer">
        <div className="Head">
          <h1 className="Title">{vote.title}
            <div className="Badge">{totalVotes} Votes</div>
          </h1>
          <div className="Description Emphasis">{vote.description}</div>
        </div>
        <div>
          {vote.choices.map(choice =>
            <ChoiceBar key={choice.id}
                       percent={choice.count * (100 / totalVotes)}
              {...choice} />
          )}
        </div>
      </div>
    );
  }
}

VotingComponent.propTypes = {
  vote: React.PropTypes.object.isRequired
};


