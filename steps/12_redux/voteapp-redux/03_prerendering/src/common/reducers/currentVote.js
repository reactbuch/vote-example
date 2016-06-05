import convertVote from '../backend/convertVote';
import { SET_CURRENT_VOTE } from '../actions';

export default function votes(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_VOTE:
      const currentVote = convertVote(action.vote);
      return currentVote;
    default:
      return state;
  }
}
