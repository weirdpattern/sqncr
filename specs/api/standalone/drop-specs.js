import run from '../../runner';
import drop from '../../../lib/api/drop';

describe('standalone/drop', () => {
  run({
    'Defaults to one when a non-numeric value is passed as count': {
      criteria: 'toEqual',
      input: [
        drop('unexpected', '1').toArray().join(''),
        drop('unexpected', 'a').toArray().join(''),
        drop('unexpected', { one: 1 }).toArray().join(''),
        drop('unexpected', [1]).toArray().join(''),
        drop('unexpected', Infinity).toArray().join(''),
        drop('unexpected', -Infinity).toArray().join(''),
        drop('unexpected', NaN).toArray().join(''),
      ],
      output: 'nexpected',
    },

    'works with strings': {
      input: drop('unexpected', 2).toArray().join(''),
      output: {
        value: 'expected',
      },
    },

    'works with arrays': {
      criteria: 'toEqual',
      input: [drop([1, 2, 3, 4], 2).toArray()],
      output: {
        value: [3, 4],
      },
    },

    'works with maps': {
      criteria: 'toEqual',
      input: [drop(new Map([[1, 1], [2, 2], [3, 3], [4, 4]]), 2).toArray()],
      output: {
        value: [3, 4],
      },
    },

    'works with sets': {
      criteria: 'toEqual',
      input: [drop(new Set([1, 2, 3, 4]), 2).toArray()],
      output: {
        value: [3, 4],
      },
    },

    'works with typed arrays': {
      criteria: 'toEqual',
      input: [
        drop(new Float32Array([1, 2, 3, 4]), 2).toArray(),
        drop(new Float64Array([1, 2, 3, 4]), 2).toArray(),
        drop(new Int8Array([1, 2, 3, 4]), 2).toArray(),
        drop(new Int16Array([1, 2, 3, 4]), 2).toArray(),
        drop(new Int32Array([1, 2, 3, 4]), 2).toArray(),
        drop(new Uint8Array([1, 2, 3, 4]), 2).toArray(),
        drop(new Uint8ClampedArray([1, 2, 3, 4]), 2).toArray(),
        drop(new Uint16Array([1, 2, 3, 4]), 2).toArray(),
        drop(new Uint32Array([1, 2, 3, 4]), 2).toArray(),
      ],
      output: {
        value: [3, 4],
      },
    },

    'works with objects': {
      criteria: 'toEqual',
      input: [drop({ one: 1, two: 2, three: 3, four: 4 }, 2).toArray()],
      output: {
        value: [3, 4],
      },
    },
  });
});
