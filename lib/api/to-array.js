/**
 * @flow
 * @module api
 */

import asSequence from '../utils/as-sequence';

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf api
 * @see Sequence.toArray
 */
export default function toArray(source : IterableObject) : Array<any> {
  return asSequence(source).reduce((accumulator : Array<any>, value : any) : Array<any> => {
    accumulator.push(value);
    return accumulator;
  }, []);
}
