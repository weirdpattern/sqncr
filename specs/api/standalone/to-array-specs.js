import run from '../../runner';
import toArray from '../../../lib/api/to-array';

describe('standalone/toArray', () => {
  run({
    'returns an empty array when the sequence is empty': {
      criteria: 'toEqual',
      input: [
        toArray(null),
        toArray(undefined),
        toArray(''),
        toArray([]),
        toArray(new Map()),
        toArray(new Set()),
        toArray(new Float32Array()),
        toArray(new Float64Array()),
        toArray(new Int8Array()),
        toArray(new Int16Array()),
        toArray(new Int32Array()),
        toArray(new Uint8Array()),
        toArray(new Uint8ClampedArray()),
        toArray(new Uint16Array()),
        toArray(new Uint32Array()),
        toArray({}),
      ],
      output: {
        value: [],
      },
    },

    'works with strings': {
      criteria: 'toEqual',
      input: [toArray('unexpected')],
      output: {
        value: ['u', 'n', 'e', 'x', 'p', 'e', 'c', 't', 'e', 'd'],
      },
    },

    'works with arrays': {
      criteria: 'toEqual',
      input: [toArray([1, 2, 3, 4])],
      output: {
        value: [1, 2, 3, 4],
      },
    },

    'works with maps': {
      criteria: 'toEqual',
      input: [toArray(new Map([[1, 1], [2, 2], [3, 3], [4, 4]]))],
      output: {
        value: [1, 2, 3, 4],
      },
    },

    'works with sets': {
      criteria: 'toEqual',
      input: [toArray(new Set([1, 2, 3, 4]))],
      output: {
        value: [1, 2, 3, 4],
      },
    },

    'works with typed arrays': {
      criteria: 'toEqual',
      input: [
        toArray(new Float32Array([1, 2, 3, 4])),
        toArray(new Float64Array([1, 2, 3, 4])),
        toArray(new Int8Array([1, 2, 3, 4])),
        toArray(new Int16Array([1, 2, 3, 4])),
        toArray(new Int32Array([1, 2, 3, 4])),
        toArray(new Uint8Array([1, 2, 3, 4])),
        toArray(new Uint8ClampedArray([1, 2, 3, 4])),
        toArray(new Uint16Array([1, 2, 3, 4])),
        toArray(new Uint32Array([1, 2, 3, 4])),
      ],
      output: {
        value: [1, 2, 3, 4],
      },
    },

    'works with objects': {
      criteria: 'toEqual',
      input: [toArray({ one: 1, two: 2, three: 3, four: 4 })],
      output: {
        value: [1, 2, 3, 4],
      },
    },
  });
});
