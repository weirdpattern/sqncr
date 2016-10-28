import { getIterator } from '../lib/utils';

describe('getIterator', () => {
  it('returns an iterator when an iterable object is passed', () => {
    const iterators : Array<Iterator> = [
      getIterator([0, 1, 2, 3]),
      getIterator('0123'),
      getIterator(new Map()),
      getIterator(new Set()),
      getIterator(new Float32Array(1)),
      getIterator(new Float64Array(1)),
      getIterator(new Int8Array(1)),
      getIterator(new Int16Array(1)),
      getIterator(new Int32Array(1)),
      getIterator(new Uint8Array(1)),
      getIterator(new Uint16Array(1)),
      getIterator(new Uint32Array(1)),
      getIterator(new Uint8ClampedArray(1)),
    ];

    for (const iterator : Iterator of iterators) {
      expect(iterator).toBeDefined();
      expect(iterator.next).toBeDefined();
      expect(typeof iterator.next).toBe('function');
    }
  });

  it('throws an exception when a non-iterable object is passed', () => {
    expect(() => getIterator(1)).toThrowError(TypeError, 'Not an iterable object.');
    expect(() => getIterator(true)).toThrowError(TypeError, 'Not an iterable object.');
    expect(() => getIterator(() => {})).toThrowError(TypeError, 'Not an iterable object.');
    expect(() => getIterator({ one: 'one' })).toThrowError(TypeError, 'Not an iterable object.');
  });
});
