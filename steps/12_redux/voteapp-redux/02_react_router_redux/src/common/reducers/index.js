import { combineReducers } from 'redux';
import votes from './votes';
import currentVote from './currentVote';
import login from './login';
import { routeReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  votes,
  currentVote,
  login,
  routing: routeReducer
});

export default rootReducer;
