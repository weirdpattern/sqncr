import run from '../../runner';
import last from '../../../lib/api/last';

describe('standalone/last', () => {
  run({
    'returns undefined when the sequence is empty': {
      input: [
        last(null),
        last(undefined),
        last(''),
        last([]),
        last(new Map()),
        last(new Set()),
        last(new Float32Array()),
        last(new Float64Array()),
        last(new Int8Array()),
        last(new Int16Array()),
        last(new Int32Array()),
        last(new Uint8Array()),
        last(new Uint8ClampedArray()),
        last(new Uint16Array()),
        last(new Uint32Array()),
        last({}),
      ],
      output: {
        value: undefined,
      },
    },

    'works with strings': {
      input: last('unexpected'),
      output: 'd',
    },

    'works with arrays': {
      input: last([1, 2, 3, 4]),
      output: 4,
    },

    'works with maps': {
      input: last(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])),
      output: 4,
    },

    'works with sets': {
      input: last(new Set([1, 2, 3, 4])),
      output: 4,
    },

    'works with typed arrays': {
      input: [
        last(new Float32Array([1, 2, 3, 4])),
        last(new Float64Array([1, 2, 3, 4])),
        last(new Int8Array([1, 2, 3, 4])),
        last(new Int16Array([1, 2, 3, 4])),
        last(new Int32Array([1, 2, 3, 4])),
        last(new Uint8Array([1, 2, 3, 4])),
        last(new Uint8ClampedArray([1, 2, 3, 4])),
        last(new Uint16Array([1, 2, 3, 4])),
        last(new Uint32Array([1, 2, 3, 4])),
      ],
      output: 4,
    },

    'works with objects': {
      input: last({ one: 1, two: 2, three: 3, four: 4 }),
      output: 4,
    },
  });
});
