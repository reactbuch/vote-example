import React from 'react';
import VotingComponent from './VotingComponent';
import {fetchJson, sendJson} from '../backend/Backend';

export default class SingleVoteController extends React.Component {
  constructor() {
    super();
    this.registerVote = this.registerVote.bind(this);
    this.routeToMain = this.routeToMain.bind(this);
    this.state = {
      vote: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.loadVote(nextProps);
  }

  componentDidMount() {
    this.loadVote(this.props);
    document.title = `Vote ${this.props.params.id} - Vote as a Service`;
  }

  loadVote(props) {
    const requestedVoteId = props.params.id;
    if (!requestedVoteId || (this.state.vote && this.state.vote.id === requestedVoteId)) {
      return;
    }
    fetchJson(`/api/votes/${requestedVoteId}`).then(vote => {
      document.title = `${vote.title} - Vote as a Service`;
      this.setState({
        vote
      });
    });
  }

  registerVote(vote, choice) {
    sendJson('put', `/api/votes/${vote.id}/choices/${choice.id}/vote`, {}).then(()=>this.routeToMain());
  }

  routeToMain() {
    this.context.history.pushState(null, '/');
  }

  render() {
    const {vote} = this.state;
    if (vote) {
      return <VotingComponent vote={vote}
                              onDismissVote={this.routeToMain}
                              onRegisterChoice={(choice)=>{this.registerVote(vote, choice)}}

      />;
    } else {
      return null;
    }
  }
}
SingleVoteController.contextTypes = {
  history: React.PropTypes.object.isRequired
};
