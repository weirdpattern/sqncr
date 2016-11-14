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
 * @see Sequence.reverse
 */
export default function reverse(
  source : IterableObject | Sequence,
) : Sequence {
  return new Sequence(asSequence(source).toArray().reverse());
}
