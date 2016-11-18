import run from '../../runner';
import Sequence from '../../../lib/sequence';

describe('sequence/toArray', () => {
  run({
    'returns an empty array when the sequence is empty': {
      criteria: 'toEqual',
      input: [
        new Sequence(null).toArray(),
        new Sequence(undefined).toArray(),
        new Sequence('').toArray(),
        new Sequence([]).toArray(),
        new Sequence(new Map()).toArray(),
        new Sequence(new Set()).toArray(),
        new Sequence(new Float32Array()).toArray(),
        new Sequence(new Float64Array()).toArray(),
        new Sequence(new Int8Array()).toArray(),
        new Sequence(new Int16Array()).toArray(),
        new Sequence(new Int32Array()).toArray(),
        new Sequence(new Uint8Array()).toArray(),
        new Sequence(new Uint8ClampedArray()).toArray(),
        new Sequence(new Uint16Array()).toArray(),
        new Sequence(new Uint32Array()).toArray(),
        new Sequence({}).toArray(),
      ],
      output: {
        value: [],
      },
    },

    'works with strings': {
      criteria: 'toEqual',
      input: [new Sequence('unexpected').toArray()],
      output: {
        value: ['u', 'n', 'e', 'x', 'p', 'e', 'c', 't', 'e', 'd'],
      },
    },

    'works with arrays': {
      criteria: 'toEqual',
      input: [new Sequence([1, 2, 3, 4]).toArray()],
      output: {
        value: [1, 2, 3, 4],
      },
    },

    'works with maps': {
      criteria: 'toEqual',
      input: [new Sequence(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])).toArray()],
      output: {
        value: [1, 2, 3, 4],
      },
    },

    'works with sets': {
      criteria: 'toEqual',
      input: [new Sequence(new Set([1, 2, 3, 4])).toArray()],
      output: {
        value: [1, 2, 3, 4],
      },
    },

    'works with typed arrays': {
      criteria: 'toEqual',
      input: [
        new Sequence(new Float32Array([1, 2, 3, 4])).toArray(),
        new Sequence(new Float64Array([1, 2, 3, 4])).toArray(),
        new Sequence(new Int8Array([1, 2, 3, 4])).toArray(),
        new Sequence(new Int16Array([1, 2, 3, 4])).toArray(),
        new Sequence(new Int32Array([1, 2, 3, 4])).toArray(),
        new Sequence(new Uint8Array([1, 2, 3, 4])).toArray(),
        new Sequence(new Uint8ClampedArray([1, 2, 3, 4])).toArray(),
        new Sequence(new Uint16Array([1, 2, 3, 4])).toArray(),
        new Sequence(new Uint32Array([1, 2, 3, 4])).toArray(),
      ],
      output: {
        value: [1, 2, 3, 4],
      },
    },

    'works with objects': {
      criteria: 'toEqual',
      input: [new Sequence({ one: 1, two: 2, three: 3, four: 4 }).toArray()],
      output: {
        value: [1, 2, 3, 4],
      },
    },
  });
});
