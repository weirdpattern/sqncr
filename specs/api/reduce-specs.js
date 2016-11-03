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
      'works without an input value with string sources': {
        input: reduce('unexpected', (reduced, value) => {
          reduced += value === 'e' ? 'a' : value;
          return reduced;
        }),
        output: {
          value: 'unaxpactad',
        },
      },
      'works without an input value with array sources': {
        criteria: 'toEqual',
        input: [
          reduce([1, 2, 3, 4], (reduced, value) => {
            reduced.push(value + 1);
            return reduced;
          }),
        ],
        output: {
          value: [2, 3, 4, 5],
        },
      },
      'works without an input value with map sources': {
        criteria: 'toEqual',
        input: [
          Array.from(
            reduce(new Map([[1, 1], [2, 2], [3, 3], [4, 4]]), (reduced, value, key) => {
              reduced.set(key, value + 1);
              return reduced;
            }).values()
          ),
        ],
        output: {
          value: [2, 3, 4, 5],
        },
      },
      'works without an input value with set sources': {
        criteria: 'toEqual',
        input: [
          Array.from(
            reduce(new Set([1, 2, 3, 4]), (reduced, value) => {
              reduced.add(value + 1);
              return reduced;
            }).values()
          ),
        ],
        output: {
          value: [2, 3, 4, 5],
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
