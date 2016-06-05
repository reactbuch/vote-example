import { createStore, combineReducers } from 'redux';

import {UPDATE_GREETING, RESET_GREETING} from './actions';

function greetingReducer(state = 'World', action) {
  switch (action.type) {
    case UPDATE_GREETING:
      return action.greeting;
    case  RESET_GREETING:
      return '';
    default:
      return state;
  }
}

const store = createStore(combineReducers({
  greeting: greetingReducer
}));

export default store;