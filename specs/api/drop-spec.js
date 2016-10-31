import drop from '../../lib/api/drop';
import Sequence from '../../lib/sequence';

describe('drop', () => {
  describe('standalone', () => {
    it('works with arrays', () => {
      const result = drop([1, 2, 3, 4], 2).toArray();
      expect(result).toEqual([3, 4]);
    });
  });

  describe('sequence api', () => {
    it('works with arrays', () => {
      const result = new Sequence([1, 2, 3, 4]).drop(2).toArray();
      expect(result).toEqual([3, 4]);
    });
  });
});
