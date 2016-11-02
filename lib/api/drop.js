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
 * @see Sequence.drop
 */
export default function drop(source : IterableObject | Sequence, count : number = 1) : Sequence {
  guard(isNumber(count), 'expecting a number');

  const sequence : Sequence = asSequence(source);

  sequence.pipe(
    (upstream : UpstreamPipeline, downstream : DownstreamPipeline) : NullableBoolean => {
      let dropped = 0;

      return upstream(
        (value : any, key : PropertyKey, collection : IterableObject) : NullableBoolean => {
          if (dropped++ < count) {
            return undefined;
          }

          return downstream(value, key, collection);
        }
      );
    }
  );

  return sequence;
}
