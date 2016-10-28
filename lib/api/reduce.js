/**
 * @flow
 * @module api
 */

import Sequence from '../definition';
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
export default function reduce(source : IterableObject,
                               aggregator : Aggregator<T>,
                               initial : any) : T {
  guard(isFunction(aggregator), 'An aggregator function is required');

  const sequence : Sequence = asSequence(source);
  if (initial == null) {
    return sequence.drop(1).reduce(aggregator, sequence.first());
  }

  let accumulator = initial;
  sequence.stream((value : any, key : PropertyKey, iterable : IterableObject) => {
    accumulator = aggregator(accumulator, value, key, iterable);
  });

  return accumulator;
}
