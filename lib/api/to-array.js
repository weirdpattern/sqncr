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

  return sequence.reduce((accumulator : Array<any>, value : any) : Array<any> => {
    accumulator.push(value);
    return accumulator;
  }, []);
}
