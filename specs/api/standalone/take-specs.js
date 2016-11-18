import run from '../../runner';
import take from '../../../lib/api/take';

describe('standalone/take', () => {
  run({
    'Defaults to one when a non-numeric value is passed as count': {
      criteria: 'toEqual',
      input: [
        take('unexpected', '1').toArray().join(''),
        take('unexpected', 'a').toArray().join(''),
        take('unexpected', { one: 1 }).toArray().join(''),
        take('unexpected', [1]).toArray().join(''),
        take('unexpected', Infinity).toArray().join(''),
        take('unexpected', -Infinity).toArray().join(''),
        take('unexpected', NaN).toArray().join(''),
      ],
      output: 'u',
    },

    'works with strings': {
      input: take('unexpected', 2).toArray().join(''),
      output: {
        value: 'un',
      },
    },

    'works with arrays': {
      criteria: 'toEqual',
      input: [take([1, 2, 3, 4], 2).toArray()],
      output: {
        value: [1, 2],
      },
    },

    'works with maps': {
      criteria: 'toEqual',
      input: [take(new Map([[1, 1], [2, 2], [3, 3], [4, 4]]), 2).toArray()],
      output: {
        value: [1, 2],
      },
    },

    'works with sets': {
      criteria: 'toEqual',
      input: [take(new Set([1, 2, 3, 4]), 2).toArray()],
      output: {
        value: [1, 2],
      },
    },

    'works with typed arrays': {
      criteria: 'toEqual',
      input: [
        take(new Float32Array([1, 2, 3, 4]), 2).toArray(),
        take(new Float64Array([1, 2, 3, 4]), 2).toArray(),
        take(new Int8Array([1, 2, 3, 4]), 2).toArray(),
        take(new Int16Array([1, 2, 3, 4]), 2).toArray(),
        take(new Int32Array([1, 2, 3, 4]), 2).toArray(),
        take(new Uint8Array([1, 2, 3, 4]), 2).toArray(),
        take(new Uint8ClampedArray([1, 2, 3, 4]), 2).toArray(),
        take(new Uint16Array([1, 2, 3, 4]), 2).toArray(),
        take(new Uint32Array([1, 2, 3, 4]), 2).toArray(),
      ],
      output: {
        value: [1, 2],
      },
    },

    'works with objects': {
      criteria: 'toEqual',
      input: [take({ one: 1, two: 2, three: 3, four: 4 }, 2).toArray()],
      output: {
        value: [1, 2],
      },
    },
  });
});
