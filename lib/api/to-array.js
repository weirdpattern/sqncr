/**
 * @flow
 * @module api
 */

import Sequence from '../sequence';
import asSequence from '../utils/as-sequence';

import type {
  IterableObject,
} from '../types';

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf api
 * @see Sequence.toArray
 */
export default function toArray(source : IterableObject | Sequence) : Array<any> {
  const sequence : Sequence = asSequence(source);

  return sequence.reduce((aggregator : Array<any>, value : any) : Array<any> => {
    aggregator.push(value);
    return aggregator;
  }, []);
}
