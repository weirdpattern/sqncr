/**
 * @flow
 * @module api
 */

import Sequence from '../sequence';
import guard from '../utils/guard';
import isNumber from '../utils/is-number';
import asSequence from '../utils/as-sequence';

import type {
  PropertyKey,
  IterableObject,
  NullableBoolean,
  UpstreamPipeline,
  DownstreamPipeline,
} from '../types';

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf api
 * @see Sequence.take
 */
export default function take(source : IterableObject, count? : number) : Sequence | any {
  const sequence : Sequence = asSequence(source);

  if (count == null) return sequence.toArray()[0];

  const total = +count;
  guard(isNumber(total), 'expecting a number');

  sequence.pipe(
    (upstream : UpstreamPipeline, downstream : DownstreamPipeline) : NullableBoolean => {
      let taken = 0;

      return upstream(
        (value : any, key : PropertyKey, collection : IterableObject) : NullableBoolean => {
          if (taken++ < total) {
            return downstream(value, key, collection);
          }

          return false;
        }
      );
    }
  );

  return sequence;
}
