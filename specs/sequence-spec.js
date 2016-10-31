import Sequence from '../lib/sequence';

describe('sequence', () => {
  it('creates a new instance', () => {
    const sequence = new Sequence([1, 2, 3, 4]);
    expect(sequence).toBeDefined();
  });
});
