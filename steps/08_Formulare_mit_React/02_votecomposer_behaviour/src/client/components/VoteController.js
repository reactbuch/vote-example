import React from 'react';
import VoteList from './VoteList';
import VoteComposer from './VoteComposer';

export default class VoteController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allVotes: props.allVotes
    };

    this.setCurrentVote = this.setCurrentVote.bind(this);
    this.registerVote = this.registerVote.bind(this);
    this.addVote = this.addVote.bind(this);
    this.activateVoteComposer = this.activateVoteComposer.bind(this);
    this.deactivateVoteComposer = this.deactivateVoteComposer.bind(this);
  }

  setCurrentVote(vote) {
    const { composerActive } = this.state;
    this.setState({currentVoteId: vote && !composerActive ? vote.id : null});
  }

  registerChoice(vote, choice) {
    const newVote = {
      ...vote,
      choices: vote.choices.map((c) => c.id !== choice.id ? c : {...c, count: c.count + 1})
    };
    return newVote;
  }

  // from VotingComponent
  registerVote(vote, choice) {
    const { allVotes } = this.state;
    const newVotes = allVotes.map((v)=>v.id !== vote.id ? v : this.registerChoice(v, choice));
    this.setState({
      allVotes: newVotes
    });
  }

  addVote(vote) {
    const { allVotes } = this.state;
    this.setState({allVotes: [...allVotes, vote]});
  }

  activateVoteComposer() {
    this.setState({
      currentVoteId:  null,
      composerActive: true
    });
  }

  deactivateVoteComposer() {
    this.setState({
      composerActive: false
    });
  }

  render() {
    const { allVotes, currentVoteId, composerActive } = this.state;

    return (
      <div>
        <VoteList allVotes={allVotes}
                  currentVoteId={currentVoteId}
                  onSelectVote={this.setCurrentVote}
                  onDismissVote={()=>{this.setCurrentVote(null)}}
                  onRegisterVote={this.registerVote}
        />
        <VoteComposer active={composerActive}
                      onDeactivate={this.deactivateVoteComposer}
                      onActivate={this.activateVoteComposer}
                      onSave={this.addVote}/>
      </div>
    );
  }
}
VoteController.propTypes = {
  allVotes: React.PropTypes.array.isRequired
};
