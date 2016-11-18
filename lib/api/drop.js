/**
 * @flow
 * @module api
 */

import Sequence from '../sequence';
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
  const limit = isNumber(count) ? count : 1;

  const sequence : Sequence = asSequence(source);
  sequence.pipe(
    // eslint-disable-next-line arrow-body-style
    (upstream : UpstreamPipeline, downstream : DownstreamPipeline) : NullableBoolean => {
      let dropped = 0;

      return upstream(
        (value : any, key : PropertyKey, collection : IterableObject) : NullableBoolean => {
          if (dropped++ < limit) {
            return undefined;
          }

          return downstream(value, key, collection);
        },
      );
    },
  );

  return sequence;
}
