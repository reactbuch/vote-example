import convertVote from '../backend/convertVote';
import { SET_VOTES } from '../actions';

export default function votes(state = [], action) {
  switch (action.type) {
    case SET_VOTES:
      const convertedVotes = action.votes.map(convertVote);
      return convertedVotes;
    default:
      return state;
  }
}
