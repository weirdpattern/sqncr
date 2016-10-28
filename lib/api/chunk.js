/**
 * @flow
 */

import { implement } from '../sequence-generator';

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * Creates chunks of length [size] from [iterable].
 * Each chunk is yielded to the next operation, the last chunk may not have the required length.
 *
 * @param {Iterable.<mixed>} iterable
 *        The iterable object to be processed.
 * @param {number} [size = 1]
 *        The size of the chunks to be created from [iterable].
 * @returns {Iterator.<Array.<mixed>>} a chunk of [iterable].
 */
export default implement(
  'chunk',
  function* chunk(iterable : Iterable<mixed>, size : number = 1) : Iterator<Array<mixed>> {
    const items : Array<mixed> = [];

    for (const item : mixed of iterable) {
      items.push(item);
      if (items.length === size) {
        yield items.splice(0, size);
      }
    }

    if (items.length > 0) {
      yield items;
    }
  }
);
