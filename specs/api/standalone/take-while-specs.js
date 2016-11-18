import run from '../../runner';
import takeWhile from '../../../lib/api/take-while';
import { GuardError } from '../../../lib/utils/guard';

function lessThanTwo(value) {
  return value <= 2;
}

describe('standalone/takeWhile', () => {
  run({
    'throws when drop condition is not a function': {
      criteria: 'toThrowError',
      input: [
        () => takeWhile('unexpected', '1').toArray().join(''),
        () => takeWhile('unexpected', 'a').toArray().join(''),
        () => takeWhile('unexpected', { one: 1 }).toArray().join(''),
        () => takeWhile('unexpected', [1]).toArray().join(''),
        () => takeWhile('unexpected', Infinity).toArray().join(''),
        () => takeWhile('unexpected', -Infinity).toArray().join(''),
        () => takeWhile('unexpected', NaN).toArray().join(''),
      ],
      output: {
        value: GuardError,
      },
    },

    'works with strings': {
      input: [takeWhile('unexpected', value => value === 'e').toArray().join('')],
      output: '',
    },

    'works with arrays': {
      criteria: 'toEqual',
      input: [takeWhile([1, 2, 3, 4], lessThanTwo).toArray()],
      output: {
        value: [1, 2],
      },
    },

    'works with maps': {
      criteria: 'toEqual',
      input: [takeWhile(new Map([[1, 1], [2, 2], [3, 3], [4, 4]]), lessThanTwo).toArray()],
      output: {
        value: [1, 2],
      },
    },

    'works with sets': {
      criteria: 'toEqual',
      input: [takeWhile(new Set([1, 2, 3, 4]), lessThanTwo).toArray()],
      output: {
        value: [1, 2],
      },
    },

    'works with typed arrays': {
      criteria: 'toEqual',
      input: [
        takeWhile(new Float32Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        takeWhile(new Float64Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        takeWhile(new Int8Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        takeWhile(new Int16Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        takeWhile(new Int32Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        takeWhile(new Uint8Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        takeWhile(new Uint8ClampedArray([1, 2, 3, 4]), lessThanTwo).toArray(),
        takeWhile(new Uint16Array([1, 2, 3, 4]), lessThanTwo).toArray(),
        takeWhile(new Uint32Array([1, 2, 3, 4]), lessThanTwo).toArray(),
      ],
      output: {
        value: [1, 2],
      },
    },

    'works with objects': {
      criteria: 'toEqual',
      input: [takeWhile({ one: 1, two: 2, three: 3, four: 4 }, lessThanTwo).toArray()],
      output: {
        value: [1, 2],
      },
    },

    'works using indexes': {
      criteria: 'toEqual',
      input: [takeWhile('unexpected', (_, index) => index < 2).toArray().join('')],
      output: 'un',
    },
  });
});
