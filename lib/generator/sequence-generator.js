/**
 * @flow
 * @module generator
 */

import isIterable from '../utils/is-iterable';

/**
 * @public
 * @constructor
 * @since 1.0.0
 * @memberOf generator
 *
 * Represents a SequenceGenerator object capable of manipulating iterable objects.
 * @param {Iterable.<mixed>} iterable the iterable object to be handle inside the sequence.
 */
export default function* SequenceGenerator(iterable : Iterable<mixed>) : Iterator<mixed> {
  if (isIterable(iterable)) {
    yield* iterable;
  }
}

// Adds the constructor
SequenceGenerator.prototype.constructor = SequenceGenerator;
