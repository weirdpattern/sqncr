/**
 * @flow
 */

import { implement } from '../sequence-generator';

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * Eliminates falsy values from [iterable].
 *
 * @param {Iterable.<mixed>} iterable
 *        The iterable object to be processed.
 * @returns {Iterator.<mixed>} the compacted iterable object.
 */
export default implement(
  'compact',
  function* compact(iterable : Iterable<mixed>) : Iterator<mixed> {
    for (const item : mixed of iterable) {
      if (item) {
        yield item;
      }
    }
  }
);
