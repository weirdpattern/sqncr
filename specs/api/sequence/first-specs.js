import run from '../../runner';
import Sequence from '../../../lib/sequence';

describe('sequence/first', () => {
  run({
    'Returns undefined when the sequence is empty': {
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
  });
});
