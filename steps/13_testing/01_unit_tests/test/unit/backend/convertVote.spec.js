import expect from 'expect';
import convertVote from '../../../src/common/backend/convertVote';
import expectedData from '../../fixtures/convertedVote';
import rawData from '../../fixtures/rawVote';

describe('Backend', () => {
  describe('convertVote', () => {
    it('calculates total votes', () => {
      const convertedVote = convertVote(rawData);
      expect(convertedVote.totalVotes).toBe(expectedData.totalVotes);
    });
  });
});
