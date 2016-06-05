import React from 'react';

// Could be pure function component, but later on we will have
// state inside this component, so start with class rather than
// function
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
      </div>
    );
  }
}

VotingComponent.propTypes = {
  vote: React.PropTypes.object.isRequired
};


