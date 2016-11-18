/**
 * @flow
 * @module api
 */

import Sequence from '../sequence';
import guard from '../utils/guard';
import isFunction from '../utils/is-function';
import asSequence from '../utils/as-sequence';

import type {
  PropertyKey,
  TakeCondition,
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
 * @see Sequence.takeWhile
 */
export default function takeWhile(source : IterableObject | Sequence,
                                  condition : TakeCondition) : Sequence {
  guard(isFunction(condition), 'expecting a function');

  const sequence : Sequence = asSequence(source);
  sequence.pipe(
    // eslint-disable-next-line arrow-body-style
    (upstream : UpstreamPipeline, downstream : DownstreamPipeline) : NullableBoolean => {
      return upstream(
        (value : any, key : PropertyKey, collection : IterableObject) : NullableBoolean => {
          if (condition(value, key, collection) === true) {
            return downstream(value, key, collection);
          }

          return false;
        },
      );
    },
  );

  return sequence;
}
