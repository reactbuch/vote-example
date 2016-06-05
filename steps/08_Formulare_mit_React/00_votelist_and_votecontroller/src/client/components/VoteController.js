import React from 'react';
import VoteList from './VoteList';

export default class VoteController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allVotes: props.allVotes
    };

    this.setCurrentVote = this.setCurrentVote.bind(this);
    this.registerVote = this.registerVote.bind(this);
  }

  setCurrentVote(vote) {
    this.setState({currentVoteId: vote ? vote.id : null});
  }

  registerChoice(vote, choice) {
    const newVote = {
      ...vote,
      choices: vote.choices.map((c) => c.id !== choice.id ? c : {...c, count: c.count + 1})
    };
    return newVote;
  }

  registerVote(vote, choice) {
    const { allVotes } = this.state;
    const newVotes = allVotes.map((v)=>v.id !== vote.id ? v : this.registerChoice(v, choice));
    this.setState({
      allVotes: newVotes
    });
  }

  render() {
    const { allVotes, currentVoteId } = this.state;

    return (
      <div>
        <VoteList allVotes={allVotes}
                  currentVoteId={currentVoteId}
                  onSelectVote={this.setCurrentVote}
                  onDismissVote={()=>{this.setCurrentVote(null)}}
                  onRegisterVote={this.registerVote}
          />
      </div>
    );
  }
}

VoteController.propTypes = {
  allVotes: React.PropTypes.array.isRequired
};
