/**
 * @flow
 */

import { implement } from '../sequence-generator';

/**
 * @public
 * @function
 * @method
 * @since 1.0.0
 *
 * Creates a consumer that will fulfill only when every item in [iterable] fulfills [predicate].
 *
 * @param {Iterable.<mixed>} iterable
 *        The iterable object to be processed.
 * @param {ItemCallback} predicate
 *        The predicate to be evaluated.
 * @returns {boolean} `true` when all items fulfill [predicate]; `false` otherwise.
 *
 * @alias every
 */
export default implement(
  ['all', 'every'],
  (iterable : Iterable<mixed>, predicate : ItemCallback) : boolean => {
    let index = 0;
    for (const item : mixed of iterable) {
      if (predicate(item, index++, iterable) === false) {
        return false;
      }
    }

    return true;
  }
);
