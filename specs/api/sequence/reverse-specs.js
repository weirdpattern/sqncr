import run from '../../runner';
import Sequence from '../../../lib/sequence';

describe('sequence/reverse', () => {
  run({
    'works with strings': {
      input: new Sequence('unexpected').reverse().toArray().join(''),
      output: 'detcepxenu',
    },

    'works with arrays': {
      criteria: 'toEqual',
      input: [new Sequence([1, 2, 3, 4]).reverse().toArray()],
      output: {
        value: [4, 3, 2, 1],
      },
    },

    'works with maps': {
      criteria: 'toEqual',
      input: [new Sequence(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])).reverse().toArray()],
      output: {
        value: [4, 3, 2, 1],
      },
    },

    'works with sets': {
      criteria: 'toEqual',
      input: [new Sequence(new Set([1, 2, 3, 4])).reverse().toArray()],
      output: {
        value: [4, 3, 2, 1],
      },
    },

    'works with typed arrays': {
      criteria: 'toEqual',
      input: [
        new Sequence(new Float32Array([1, 2, 3, 4])).reverse().toArray(),
        new Sequence(new Float64Array([1, 2, 3, 4])).reverse().toArray(),
        new Sequence(new Int8Array([1, 2, 3, 4])).reverse().toArray(),
        new Sequence(new Int16Array([1, 2, 3, 4])).reverse().toArray(),
        new Sequence(new Int32Array([1, 2, 3, 4])).reverse().toArray(),
        new Sequence(new Uint8Array([1, 2, 3, 4])).reverse().toArray(),
        new Sequence(new Uint8ClampedArray([1, 2, 3, 4])).reverse().toArray(),
        new Sequence(new Uint16Array([1, 2, 3, 4])).reverse().toArray(),
        new Sequence(new Uint32Array([1, 2, 3, 4])).reverse().toArray(),
      ],
      output: {
        value: [4, 3, 2, 1],
      },
    },

    'works with objects': {
      criteria: 'toEqual',
      input: [new Sequence({ one: 1, two: 2, three: 3, four: 4 }).reverse().toArray()],
      output: {
        value: [4, 3, 2, 1],
      },
    },
  });
});
