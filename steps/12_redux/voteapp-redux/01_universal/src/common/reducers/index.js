import { combineReducers } from 'redux';
import votes from './votes';
import currentVote from './currentVote';
import login from './login';

const rootReducer = combineReducers({
  votes,
  currentVote,
  login
});

export default rootReducer;
