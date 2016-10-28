/**
 * @flow
 * @module utils
 */

import guard from '../../utils/guard';
import { $$ITERATOR } from './constants';

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf utils
 *
 * Gets the inner iterator of [iterable].
 * If [iterable] is not an iterable object, the method throws an exception.
 *
 * @param {any} candidate
 *        The iterable object whose iterator we want.
 * @returns {Iterator.<mixed>} the iterator of [candidate].
 * @throws {TypeError} when [candidate] is not an iterable object.
 */
export function getIterator(candidate : any) : Iterator<mixed> {
  guard(isIterable(candidate), 'Expecting an iterable object');
  return candidate[$$ITERATOR]();
}
