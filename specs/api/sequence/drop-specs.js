import run from '../../runner';
import Sequence from '../../../lib/sequence';

describe('sequence/drop', () => {
  run({
    'Defaults to one when a non-numeric value is passed as count': {
      input: [
        new Sequence('unexpected').drop('1').toArray().join(''),
        new Sequence('unexpected').drop('a').toArray().join(''),
        new Sequence('unexpected').drop({ one: 1 }).toArray().join(''),
        new Sequence('unexpected').drop([1]).toArray().join(''),
        new Sequence('unexpected').drop(Infinity).toArray().join(''),
        new Sequence('unexpected').drop(-Infinity).toArray().join(''),
        new Sequence('unexpected').drop(NaN).toArray().join(''),
      ],
      output: 'nexpected',
    },

    'works with strings': {
      input: new Sequence('unexpected').drop(2).toArray().join(''),
      output: {
        value: 'expected',
      },
    },

    'works with arrays': {
      criteria: 'toEqual',
      input: [new Sequence([1, 2, 3, 4]).drop(2).toArray()],
      output: {
        value: [3, 4],
      },
    },

    'works with maps': {
      criteria: 'toEqual',
      input: [new Sequence(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])).drop(2).toArray()],
      output: {
        value: [3, 4],
      },
    },

    'works with sets': {
      criteria: 'toEqual',
      input: [new Sequence(new Set([1, 2, 3, 4])).drop(2).toArray()],
      output: {
        value: [3, 4],
      },
    },

    'works with typed arrays': {
      criteria: 'toEqual',
      input: [
        new Sequence(new Float32Array([1, 2, 3, 4])).drop(2).toArray(),
        new Sequence(new Float64Array([1, 2, 3, 4])).drop(2).toArray(),
        new Sequence(new Int8Array([1, 2, 3, 4])).drop(2).toArray(),
        new Sequence(new Int16Array([1, 2, 3, 4])).drop(2).toArray(),
        new Sequence(new Int32Array([1, 2, 3, 4])).drop(2).toArray(),
        new Sequence(new Uint8Array([1, 2, 3, 4])).drop(2).toArray(),
        new Sequence(new Uint8ClampedArray([1, 2, 3, 4])).drop(2).toArray(),
        new Sequence(new Uint16Array([1, 2, 3, 4])).drop(2).toArray(),
        new Sequence(new Uint32Array([1, 2, 3, 4])).drop(2).toArray(),
      ],
      output: {
        value: [3, 4],
      },
    },

    'works with objects': {
      criteria: 'toEqual',
      input: [new Sequence({ one: 1, two: 2, three: 3, four: 4 }).drop(2).toArray()],
      output: {
        value: [3, 4],
      },
    },
  });
});
