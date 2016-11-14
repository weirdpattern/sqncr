/**
 * @flow
 * @module api
 */

import Sequence from '../sequence';
import asSequence from '../utils/as-sequence';

import type {
  IterableObject,
} from '../types';

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf api
 * @see Sequence.first
 */
export default function first(
  source : IterableObject | Sequence,
) : any {
  const items = asSequence(source).toArray();
  if (items.length > 0) {
    return items[0];
  }
  return undefined;
}
