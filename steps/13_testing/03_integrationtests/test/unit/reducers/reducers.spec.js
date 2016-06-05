import expect from 'expect';
import rootReducer from '../../../src/common/reducers/index';
import * as actions from '../../../src/common/actions';

import expectedVote from '../../fixtures/convertedVote';
import rawVote from '../../fixtures/rawVote';

import expectedVotes from '../../fixtures/convertedVotes';
import rawVotes from '../../fixtures/rawVotes';

describe('reducers', () => {
  describe('rootReducer', () => {
    it('return an overall state', () => {
      const newState = rootReducer(undefined, {type: 'some_action'});
      expect(newState).toBeAn('object');
      expect(newState.currentVote).toBe(null);
      expect(newState.votes).toEqual([]);
      expect(newState.login).toBe(null);
    });
    it('handles SET_CURRENT_VOTE action', () => {
      const action = {
        type: actions.SET_CURRENT_VOTE,
        vote: rawVote
      };
      const newState = rootReducer(undefined, action);
      expect(newState.currentVote).toEqual(expectedVote);
    });
    it('handles SET_VOTES action', () => {
      const action = {
        type:  actions.SET_VOTES,
        votes: rawVotes
      };
      const newState = rootReducer(undefined, action);
      expect(newState.votes).toEqual(expectedVotes);
    });
    it('handles LOGIN action', () => {
      const action = {
        type:     actions.LOGIN,
        username: 'lemmy'
      };
      const newState = rootReducer(undefined, action);
      expect(newState.login).toEqual('lemmy');
    });
  });
});
