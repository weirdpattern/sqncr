/**
 * @flow
 * @module api
 */

import Sequence from '../sequence';
import guard from '../utils/guard';
import isNumber from '../utils/is-number';
import asSequence from '../utils/as-sequence';

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf api
 * @see Sequence.first
 */
export default function first(
  source : IterableObject | Sequence,
  count : number = 1
) : any {
  const items = asSequence(source).toArray();
  if (items.length > 0) {
    return items[0];
  }
  return undefined;
}
