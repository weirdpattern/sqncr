import run from '../../runner';
import Sequence from '../../../lib/sequence';

describe('sequence/last', () => {
  run({
    'returns undefined when the sequence is empty': {
      input: [
        new Sequence(null).last(),
        new Sequence(undefined).last(),
        new Sequence('').last(),
        new Sequence([]).last(),
        new Sequence(new Map()).last(),
        new Sequence(new Set()).last(),
        new Sequence(new Float32Array()).last(),
        new Sequence(new Float64Array()).last(),
        new Sequence(new Int8Array()).last(),
        new Sequence(new Int16Array()).last(),
        new Sequence(new Int32Array()).last(),
        new Sequence(new Uint8Array()).last(),
        new Sequence(new Uint8ClampedArray()).last(),
        new Sequence(new Uint16Array()).last(),
        new Sequence(new Uint32Array()).last(),
        new Sequence({}).last(),
      ],
      output: {
        value: undefined,
      },
    },

    'works with strings': {
      input: new Sequence('unexpected').last(),
      output: 'd',
    },

    'works with arrays': {
      input: new Sequence([1, 2, 3, 4]).last(),
      output: 4,
    },

    'works with maps': {
      input: new Sequence(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])).last(),
      output: 4,
    },

    'works with sets': {
      input: new Sequence(new Set([1, 2, 3, 4])).last(),
      output: 4,
    },

    'works with typed arrays': {
      input: [
        new Sequence(new Float32Array([1, 2, 3, 4])).last(),
        new Sequence(new Float64Array([1, 2, 3, 4])).last(),
        new Sequence(new Int8Array([1, 2, 3, 4])).last(),
        new Sequence(new Int16Array([1, 2, 3, 4])).last(),
        new Sequence(new Int32Array([1, 2, 3, 4])).last(),
        new Sequence(new Uint8Array([1, 2, 3, 4])).last(),
        new Sequence(new Uint8ClampedArray([1, 2, 3, 4])).last(),
        new Sequence(new Uint16Array([1, 2, 3, 4])).last(),
        new Sequence(new Uint32Array([1, 2, 3, 4])).last(),
      ],
      output: 4,
    },

    'works with objects': {
      input: new Sequence({ one: 1, two: 2, three: 3, four: 4 }).last(),
      output: 4,
    },
  });
});
