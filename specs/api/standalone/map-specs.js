import run from '../../runner';
import map from '../../../lib/api/map';
import { GuardError } from '../../../lib/utils/guard';

function increase(value) { return value + 1; }

describe('standalone/map', () => {
  run({
    'throws when a mapper function is not provided': {
      criteria: 'toThrowError',
      input: () => map('unexpected').toArray().join(''),
      output: {
        value: GuardError,
      },
    },

    'throws when mapper function is not a function': {
      criteria: 'toThrowError',
      input: [
        () => map('unexpected', true).toArray().join(''),
        () => map('unexpected', 0).toArray().join(''),
        () => map('unexpected', 'test').toArray().join(''),
        () => map('unexpected', {}).toArray().join(''),
        () => map('unexpected', []).toArray().join(''),
      ],
      output: {
        value: GuardError,
      },
    },

    'can map keys': {
      input: map('unexpected', (value, key) => {
        if (key < 2) return '';
        return value;
      }).toArray().join(''),
      output: 'expected',
    },

    'can access the source object': {
      // eslint-disable-next-line arrow-body-style
      input: map('unexpected', (value, key, source) => {
        return (key === 5) ? ` ${source} ` : value;
      }).toArray().join(''),
      output: 'unexp unexpected cted',
    },

    'works with strings': {
      // eslint-disable-next-line arrow-body-style
      input: map('unexpected', (value) => {
        return value === 'e' ? 'a' : value;
      }).toArray().join(''),
      output: 'unaxpactad',
    },

    'works with arrays': {
      criteria: 'toEqual',
      input: [map([1, 2, 3, 4], increase).toArray()],
      output: {
        value: [2, 3, 4, 5],
      },
    },

    'works with maps': {
      criteria: 'toEqual',
      input: [map(new Map([[1, 1], [2, 2], [3, 3], [4, 4]]), increase).toArray()],
      output: {
        value: [2, 3, 4, 5],
      },
    },

    'works with sets': {
      criteria: 'toEqual',
      input: [map(new Set([1, 2, 3, 4]), increase).toArray()],
      output: {
        value: [2, 3, 4, 5],
      },
    },

    'works with typed arrays': {
      criteria: 'toEqual',
      input: [
        map(new Float32Array([1, 2, 3, 4]), increase).toArray(),
        map(new Float64Array([1, 2, 3, 4]), increase).toArray(),
        map(new Int8Array([1, 2, 3, 4]), increase).toArray(),
        map(new Int16Array([1, 2, 3, 4]), increase).toArray(),
        map(new Int32Array([1, 2, 3, 4]), increase).toArray(),
        map(new Uint8Array([1, 2, 3, 4]), increase).toArray(),
        map(new Uint8ClampedArray([1, 2, 3, 4]), increase).toArray(),
        map(new Uint16Array([1, 2, 3, 4]), increase).toArray(),
        map(new Uint32Array([1, 2, 3, 4]), increase).toArray(),
      ],
      output: {
        value: [2, 3, 4, 5],
      },
    },

    'works with objects': {
      criteria: 'toEqual',
      input: [map({ one: 1, two: 2, three: 3, four: 4 }, increase).toArray()],
      output: {
        value: [2, 3, 4, 5],
      },
    },

    'works with objects using keys': {
      criteria: 'toEqual',
      input: [map({ one: 1, two: 2, three: 3, four: 4 }, (_, key) => key).toArray()],
      output: {
        value: ['one', 'two', 'three', 'four'],
      },
    },
  });
});
