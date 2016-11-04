/**
 * @flow
 * @module utils
 */

import Sequence from '../sequence';

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf utils
 *
 * Determines if `candidate` is a Sequence.
 * @param  {*}       candidate the candidate to be evaluated.
 * @return {boolean}           `true` when `candidate` is a Sequence; `false` otherwise.
 *
 * @example
 * const candidate = new Sequence([0, 1, 2, 3]);
 * isSequence(candidate); // true
 *
 * const candidate = [0, 1, 2, 3];
 * isSequence(candidate); // false
 */
export default function isSequence(
  candidate : any
) : boolean {
  return candidate instanceof Sequence;
}
