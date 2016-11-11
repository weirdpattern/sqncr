import drop from '../../../lib/api/drop';
import { GuardError } from '../../../lib/utils/guard';

export default {
  'throws when drop condition is not a function': {
    criteria: 'toThrowError',
    input: [
      () => drop('unexpected', '1').toArray().join(''),
      () => drop('unexpected', 'a').toArray().join(''),
      () => drop('unexpected', { one: 1 }).toArray().join(''),
      () => drop('unexpected', [1]).toArray().join(''),
      () => drop('unexpected', Infinity).toArray().join(''),
      () => drop('unexpected', -Infinity).toArray().join(''),
      () => drop('unexpected', NaN).toArray().join(''),
    ],
    output: {
      value: GuardError,
    },
  },
};
