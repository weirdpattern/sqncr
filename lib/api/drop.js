/**
 * @flow
 * @module api
 */

import Sequence from '../sequence';
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
