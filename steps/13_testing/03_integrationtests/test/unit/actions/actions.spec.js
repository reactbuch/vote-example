import expect, { createSpy, spyOn  } from 'expect';
import * as Backend from '../../../src/common/backend/Backend';
import * as actions from '../../../src/common/actions';
import rawVote from '../../fixtures/rawVote';
import rawVotes from '../../fixtures/rawVotes';

describe('Actions', () => {
  const dispatch = createSpy();

  const mockFetchJson = (result) => {
    spyOn(Backend, 'fetchJson')
      .andReturn({
        then(fn) {
          fn(result);
        }
      });
  };

  const mockSendJson = () => {
    spyOn(Backend, 'sendJson')
      .andReturn({
        then(fn) {
          fn();
        }
      });
  };

  it('shout create login action', () => {
    const action = actions.login('lemmy');
    expect(action).toEqual({type: actions.LOGIN, username: 'lemmy'});
  });

  it('should create SET_VOTES action', () => {
    mockFetchJson(rawVotes);
    const fn = actions.loadVotes();
    fn(dispatch);
    expect(dispatch).toHaveBeenCalledWith({type: actions.SET_VOTES, votes: rawVotes});
  });

  it('should create SET_CURRENT_VOTE action', () => {
    mockFetchJson(rawVote);
    const fn = actions.loadVote('xxx');
    fn(dispatch);
    expect(dispatch).toHaveBeenCalledWith({type: actions.SET_CURRENT_VOTE, vote: rawVote});
  });

  it('should handle registerVote action', () => {
    mockSendJson();
    const fn = actions.registerVote({id: 1}, {id: 2});
    fn(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should handle registerVote action', () => {
    mockSendJson();
    const fn = actions.addVote({});
    fn(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  afterEach(() => {
    expect.restoreSpies();
    dispatch.reset();
  });
});
