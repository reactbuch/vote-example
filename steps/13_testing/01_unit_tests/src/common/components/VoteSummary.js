import React from 'react';

import { Link } from 'react-router';

// FIXME
// unfortunately, if you have a stateless component, ReactTestUtils can not properly render it
// temporarily we make this an ordinary component
// need to wait until this
// https://github.com/facebook/react/issues/4913
// is released then revert to stateless component
export default class VoteSummary extends React.Component {
  render() {
    const { vote } = this.props;
    const totalVotes = vote.choices.reduce((prev, curr) => prev + curr.count, 0);

    return (
      <div className="Row VotesRow Selectable">
        <Link to={`/votes/${vote.id}`}>
          <h1 className="Title">{vote.title}
            <div className="Badge">{totalVotes} Votes</div>
          </h1>

          <p className="Emphasis">{vote.description}</p>
        </Link>
      </div>
    );
  }
}
VoteSummary.propTypes = {
  vote: React.PropTypes.object.isRequired
};
