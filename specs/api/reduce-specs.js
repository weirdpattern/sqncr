import execute from '../base';
import reduce from '../../lib/api/reduce';
import Sequence from '../../lib/sequence';
import { GuardError } from '../../lib/utils/guard';

describe('api', () => {
  describe('reduce', () => {
    execute({
      'throws when an aggregator function is not provided': {
        criteria: 'toThrowError',
        input: () => reduce('unexpected').toArray().join(''),
        output: {
          value: GuardError,
        },
      },
    });
  });

  describe('sequence.reduce', () => {
    execute({
      'throws when an aggregator function is not provided': {
        criteria: 'toThrowError',
        input: () => new Sequence('unexpected').reduce().toArray().join(''),
        output: {
          value: GuardError,
        },
      },
    });
  });
});
