import { LOGIN } from '../actions';

export default function login(state = null, action) {
  switch (action.type) {
  case LOGIN:
    return action.username;
  default:
    return state;
  }
}
