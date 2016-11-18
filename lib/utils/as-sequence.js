/**
 * @flow
 * @module utils
 */

import Sequence from '../sequence';

import type {
  IterableObject,
} from '../types';

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf utils
 *
 * Ensures `source` is a sequence.
 * @param  {(IterableObject | Sequence)} source the source object to be validated.
 * @return {Sequence}              the source expressed as a sequence.
 *
 * @example
 * const candidate = new Sequence([0, 1, 2, 3]);
 * asSequence(candidate); // candidate
 *
 * const candidate = [0, 1, 2, 3];
 * asSequence(candidate); // new Sequence(candidate);
 */
export default function asSequence(source : IterableObject | Sequence) : Sequence {
  return source instanceof Sequence ? source : new Sequence(source);
}
