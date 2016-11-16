import run from '../../runner';
import Sequence from '../../../lib/sequence';
import { GuardError } from '../../../lib/utils/guard';

function increase(value) { return value + 1; }

describe('sequence/map', () => {
  run({
    'throws when a mapper function is not provided': {
      criteria: 'toThrowError',
      input: () => new Sequence('unexpected').map().toArray().join(''),
      output: {
        value: GuardError,
      },
    },

    'throws when mapper function is not a function': {
      criteria: 'toThrowError',
      input: [
        () => new Sequence('unexpected').map(true).toArray().join(''),
        () => new Sequence('unexpected').map(0).toArray().join(''),
        () => new Sequence('unexpected').map('test').toArray().join(''),
        () => new Sequence('unexpected').map({}).toArray().join(''),
        () => new Sequence('unexpected').map([]).toArray().join(''),
      ],
      output: {
        value: GuardError,
      },
    },

    'can map keys': {
      input: new Sequence('unexpected').map((value, key) => {
        if (key < 2) return '';
        return value;
      }).toArray().join(''),
      output: 'expected',
    },

    'can access the source object': {
      // eslint-disable-next-line arrow-body-style
      input: new Sequence('unexpected').map((value, key, source) => {
        return (key === 5) ? ` ${source} ` : value;
      }).toArray().join(''),
      output: 'unexp unexpected cted',
    },

    'works with strings': {
      // eslint-disable-next-line arrow-body-style
      input: new Sequence('unexpected').map((value) => {
        return value === 'e' ? 'a' : value;
      }).toArray().join(''),
      output: 'unaxpactad',
    },

    'works with arrays': {
      criteria: 'toEqual',
      input: [new Sequence([1, 2, 3, 4]).map(increase).toArray()],
      output: {
        value: [2, 3, 4, 5],
      },
    },

    'works with maps': {
      criteria: 'toEqual',
      input: [new Sequence(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])).map(increase).toArray()],
      output: {
        value: [2, 3, 4, 5],
      },
    },

    'works with sets': {
      criteria: 'toEqual',
      input: [new Sequence(new Set([1, 2, 3, 4])).map(increase).toArray()],
      output: {
        value: [2, 3, 4, 5],
      },
    },

    'works with typed arrays': {
      criteria: 'toEqual',
      input: [
        new Sequence(new Float32Array([1, 2, 3, 4])).map(increase).toArray(),
        new Sequence(new Float64Array([1, 2, 3, 4])).map(increase).toArray(),
        new Sequence(new Int8Array([1, 2, 3, 4])).map(increase).toArray(),
        new Sequence(new Int16Array([1, 2, 3, 4])).map(increase).toArray(),
        new Sequence(new Int32Array([1, 2, 3, 4])).map(increase).toArray(),
        new Sequence(new Uint8Array([1, 2, 3, 4])).map(increase).toArray(),
        new Sequence(new Uint8ClampedArray([1, 2, 3, 4])).map(increase).toArray(),
        new Sequence(new Uint16Array([1, 2, 3, 4])).map(increase).toArray(),
        new Sequence(new Uint32Array([1, 2, 3, 4])).map(increase).toArray(),
      ],
      output: {
        value: [2, 3, 4, 5],
      },
    },

    'works with objects': {
      criteria: 'toEqual',
      input: [new Sequence({ one: 1, two: 2, three: 3, four: 4 }).map(increase).toArray()],
      output: {
        value: [2, 3, 4, 5],
      },
    },

    'works with objects using keys': {
      criteria: 'toEqual',
      input: [new Sequence({ one: 1, two: 2, three: 3, four: 4 }).map((_, key) => key).toArray()],
      output: {
        value: ['one', 'two', 'three', 'four'],
      },
    },
  });
});
