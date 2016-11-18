import run from '../../runner';
import Sequence from '../../../lib/sequence';

describe('sequence/first', () => {
  run({
    'returns undefined when the sequence is empty': {
      input: [
        new Sequence(null).first(),
        new Sequence(undefined).first(),
        new Sequence('').first(),
        new Sequence([]).first(),
        new Sequence(new Map()).first(),
        new Sequence(new Set()).first(),
        new Sequence(new Float32Array()).first(),
        new Sequence(new Float64Array()).first(),
        new Sequence(new Int8Array()).first(),
        new Sequence(new Int16Array()).first(),
        new Sequence(new Int32Array()).first(),
        new Sequence(new Uint8Array()).first(),
        new Sequence(new Uint8ClampedArray()).first(),
        new Sequence(new Uint16Array()).first(),
        new Sequence(new Uint32Array()).first(),
        new Sequence({}).first(),
      ],
      output: {
        value: undefined,
      },
    },

    'works with strings': {
      input: new Sequence('unexpected').first(),
      output: 'u',
    },

    'works with arrays': {
      input: new Sequence([1, 2, 3, 4]).first(),
      output: 1,
    },

    'works with maps': {
      input: new Sequence(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])).first(),
      output: 1,
    },

    'works with sets': {
      input: new Sequence(new Set([1, 2, 3, 4])).first(),
      output: 1,
    },

    'works with typed arrays': {
      input: [
        new Sequence(new Float32Array([1, 2, 3, 4])).first(),
        new Sequence(new Float64Array([1, 2, 3, 4])).first(),
        new Sequence(new Int8Array([1, 2, 3, 4])).first(),
        new Sequence(new Int16Array([1, 2, 3, 4])).first(),
        new Sequence(new Int32Array([1, 2, 3, 4])).first(),
        new Sequence(new Uint8Array([1, 2, 3, 4])).first(),
        new Sequence(new Uint8ClampedArray([1, 2, 3, 4])).first(),
        new Sequence(new Uint16Array([1, 2, 3, 4])).first(),
        new Sequence(new Uint32Array([1, 2, 3, 4])).first(),
      ],
      output: 1,
    },

    'works with objects': {
      input: new Sequence({ one: 1, two: 2, three: 3, four: 4 }).first(),
      output: 1,
    },
  });
});
