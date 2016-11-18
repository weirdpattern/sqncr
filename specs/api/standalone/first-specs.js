import run from '../../runner';
import first from '../../../lib/api/first';

describe('standalone/first', () => {
  run({
    'returns undefined when the sequence is empty': {
      input: [
        first(null),
        first(undefined),
        first(''),
        first([]),
        first(new Map()),
        first(new Set()),
        first(new Float32Array()),
        first(new Float64Array()),
        first(new Int8Array()),
        first(new Int16Array()),
        first(new Int32Array()),
        first(new Uint8Array()),
        first(new Uint8ClampedArray()),
        first(new Uint16Array()),
        first(new Uint32Array()),
        first({}),
      ],
      output: {
        value: undefined,
      },
    },

    'works with strings': {
      input: first('unexpected'),
      output: 'u',
    },

    'works with arrays': {
      input: first([1, 2, 3, 4]),
      output: 1,
    },

    'works with maps': {
      input: first(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])),
      output: 1,
    },

    'works with sets': {
      input: first(new Set([1, 2, 3, 4])),
      output: 1,
    },

    'works with typed arrays': {
      input: [
        first(new Float32Array([1, 2, 3, 4])),
        first(new Float64Array([1, 2, 3, 4])),
        first(new Int8Array([1, 2, 3, 4])),
        first(new Int16Array([1, 2, 3, 4])),
        first(new Int32Array([1, 2, 3, 4])),
        first(new Uint8Array([1, 2, 3, 4])),
        first(new Uint8ClampedArray([1, 2, 3, 4])),
        first(new Uint16Array([1, 2, 3, 4])),
        first(new Uint32Array([1, 2, 3, 4])),
      ],
      output: 1,
    },

    'works with objects': {
      input: first({ one: 1, two: 2, three: 3, four: 4 }),
      output: 1,
    },
  });
});
