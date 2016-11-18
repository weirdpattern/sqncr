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
 * @see Sequence.last
 */
export default function last(source : IterableObject | Sequence) : any {
  const items = asSequence(source).toArray();
  if (items.length > 0) {
    return items[items.length - 1];
  }
  return undefined;
}
