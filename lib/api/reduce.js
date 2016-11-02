/**
 * @flow
 * @module api
 */

import Sequence from '../sequence';
import guard from '../utils/guard';
import isFunction from '../utils/is-function';
import asSequence from '../utils/as-sequence';

import type {
  Aggregator,
  PropertyKey,
  IterableObject,
} from '../types';

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf api
 * @see Sequence.reduce
 */
export default function reduce<T>(source : IterableObject | Sequence,
                                  aggregator : Aggregator<T>,
                                  initial : any) : T {
  const sequence : Sequence = asSequence(source);
  guard(isFunction(aggregator), 'An aggregator function is required');

  if (initial == null) {
    return sequence.tail().reduce(aggregator, sequence.head());
  }

  let accumulator = initial;
  sequence.stream((value : any, key : PropertyKey, iterable : IterableObject) => {
    accumulator = aggregator(accumulator, value, key, iterable);
  });

  return accumulator;
}
