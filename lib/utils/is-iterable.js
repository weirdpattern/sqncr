/**
 * @flow
 * @module utils
 */

import {
  $$ITERATOR,
} from './constants';

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf utils
 *
 * Determines if [candidate] is an iterable object.
 *
 * @param {mixed} candidate
 *        The candidate to be evaluated.
 * @returns {boolean} `true` when [candidate] is an iterable object; `false` otherwise.
 */
export function isIterable(candidate : any) : boolean {
  return candidate != null && typeof candidate[$$ITERATOR] === 'function' && !(
    typeof candidate === 'string' && candidate.length === 1
  );
}
