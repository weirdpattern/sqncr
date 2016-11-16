import run from '../../runner';
import Sequence from '../../../lib/sequence';
import { GuardError } from '../../../lib/utils/guard';

function lessThanTwo(value) {
  return value <= 2;
}

describe('sequence/drop', () => {
  run({
    'throws when drop condition is not a function': {
      criteria: 'toThrowError',
      input: [
        () => new Sequence('unexpected').dropWhile('1').toArray().join(''),
        () => new Sequence('unexpected').dropWhile('a').toArray().join(''),
        () => new Sequence('unexpected').dropWhile({ one: 1 }).toArray().join(''),
        () => new Sequence('unexpected').dropWhile([1]).toArray().join(''),
        () => new Sequence('unexpected').dropWhile(Infinity).toArray().join(''),
        () => new Sequence('unexpected').dropWhile(-Infinity).toArray().join(''),
        () => new Sequence('unexpected').dropWhile(NaN).toArray().join(''),
      ],
      output: {
        value: GuardError,
      },
    },

    'works with strings': {
      input: [new Sequence('unexpected').dropWhile(value => value === 'e').toArray().join('')],
      output: 'unxpctd',
    },

    'works with arrays': {
      criteria: 'toEqual',
      input: [new Sequence([1, 2, 3, 4]).dropWhile(lessThanTwo).toArray()],
      output: {
        value: [3, 4],
      },
    },

    'works with maps': {
      criteria: 'toEqual',
      input: [
        new Sequence(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])).dropWhile(lessThanTwo).toArray(),
      ],
      output: {
        value: [3, 4],
      },
    },

    'works with sets': {
      criteria: 'toEqual',
      input: [new Sequence(new Set([1, 2, 3, 4])).dropWhile(lessThanTwo).toArray()],
      output: {
        value: [3, 4],
      },
    },

    'works with typed arrays': {
      criteria: 'toEqual',
      input: [
        new Sequence(new Float32Array([1, 2, 3, 4])).dropWhile(lessThanTwo).toArray(),
        new Sequence(new Float64Array([1, 2, 3, 4])).dropWhile(lessThanTwo).toArray(),
        new Sequence(new Int8Array([1, 2, 3, 4])).dropWhile(lessThanTwo).toArray(),
        new Sequence(new Int16Array([1, 2, 3, 4])).dropWhile(lessThanTwo).toArray(),
        new Sequence(new Int32Array([1, 2, 3, 4])).dropWhile(lessThanTwo).toArray(),
        new Sequence(new Uint8Array([1, 2, 3, 4])).dropWhile(lessThanTwo).toArray(),
        new Sequence(new Uint8ClampedArray([1, 2, 3, 4])).dropWhile(lessThanTwo).toArray(),
        new Sequence(new Uint16Array([1, 2, 3, 4])).dropWhile(lessThanTwo).toArray(),
        new Sequence(new Uint32Array([1, 2, 3, 4])).dropWhile(lessThanTwo).toArray(),
      ],
      output: {
        value: [3, 4],
      },
    },

    'works with objects': {
      criteria: 'toEqual',
      input: [new Sequence({ one: 1, two: 2, three: 3, four: 4 }).dropWhile(lessThanTwo).toArray()],
      output: {
        value: [3, 4],
      },
    },

    'works using indexes': {
      criteria: 'toEqual',
      input: [new Sequence('unexpected').dropWhile((_, index) => index < 2).toArray().join('')],
      output: 'expected',
    },
  });
});
