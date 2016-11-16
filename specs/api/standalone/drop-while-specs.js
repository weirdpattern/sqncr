import run from '../../runner';
import dropWhile from '../../../lib/api/drop-while';
import { GuardError } from '../../../lib/utils/guard';

function lessThanTwo(value) {
  return value <= 2;
}

describe('standalone/dropWhile', () => {
  run({
    'throws when drop condition is not a function': {
      criteria: 'toThrowError',
      input: [
        () => dropWhile('unexpected', '1').toArray().join(''),
        () => dropWhile('unexpected', 'a').toArray().join(''),
        () => dropWhile('unexpected', { one: 1 }).toArray().join(''),
        () => dropWhile('unexpected', [1]).toArray().join(''),
        () => dropWhile('unexpected', Infinity).toArray().join(''),
        () => dropWhile('unexpected', -Infinity).toArray().join(''),
        () => dropWhile('unexpected', NaN).toArray().join(''),
      ],
      output: {
        value: GuardError,
      },
    },

    'works with strings': {
      input: [dropWhile('unexpected', value => value === 'e').toArray().join('')],
      output: 'unxpctd',
    },

    'works with arrays': {
      criteria: 'toEqual',
      input: [dropWhile([1, 2, 3, 4], lessThanTwo).toArray()],
      output: {
        value: [3, 4],
      },
    },

    'works with maps': {
      criteria: 'toEqual',
      input: [dropWhile(new Map([[1, 1], [2, 2], [3, 3], [4, 4]]), lessThanTwo).toArray()],
      output: {
        value: [3, 4],
      },
    },

    'works with sets': {
      criteria: 'toEqual',
      input: [dropWhile(new Set([1, 2, 3, 4]), lessThanTwo).toArray()],
      output: {
        value: [3, 4],
      },
    },

    'works with typed arrays': {
      criteria: 'toEqual',
      input: [
        dropWhile(new Float32Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        dropWhile(new Float64Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        dropWhile(new Int8Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        dropWhile(new Int16Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        dropWhile(new Int32Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        dropWhile(new Uint8Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        dropWhile(new Uint8ClampedArray([1, 2, 3, 4]), lessThanTwo).toArray(),
        dropWhile(new Uint16Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        dropWhile(new Uint32Array([1, 2, 3, 4]), lessThanTwo).toArray(),
      ],
      output: {
        value: [3, 4],
      },
    },

    'works with objects': {
      criteria: 'toEqual',
      input: [dropWhile({ one: 1, two: 2, three: 3, four: 4 }, lessThanTwo).toArray()],
      output: {
        value: [3, 4],
      },
    },

    'works using indexes': {
      criteria: 'toEqual',
      input: [dropWhile('unexpected', (_, index) => index < 2).toArray().join('')],
      output: 'expected',
    },
  });
});
