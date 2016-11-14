import run from '../../runner';
import Sequence from '../../../lib/sequence';
import { GuardError } from '../../../lib/utils/guard';

describe('sequence/drop', () => {
  run({
    'throws when drop condition is not a function': {
      criteria: 'toThrowError',
      input: [
        () => new Sequence('unexpected').drop('1').toArray().join(''),
        () => new Sequence('unexpected').drop('a').toArray().join(''),
        () => new Sequence('unexpected').drop({ one: 1 }).toArray().join(''),
        () => new Sequence('unexpected').drop([1]).toArray().join(''),
        () => new Sequence('unexpected').drop(Infinity).toArray().join(''),
        () => new Sequence('unexpected').drop(-Infinity).toArray().join(''),
        () => new Sequence('unexpected').drop(NaN).toArray().join(''),
      ],
      output: {
        value: GuardError,
      },
    },
  });
});
