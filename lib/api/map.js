/**
 * @flow
 * @module api
 */

import Sequence from '../sequence';
import guard from '../utils/guard';
import isFunction from '../utils/is-function';
import asSequence from '../utils/as-sequence';

import type {
  Mapper,
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
 * @see Sequence.map
 */
export default function map(
  source : IterableObject | Sequence,
  mapper : Mapper,
) : Sequence {
  guard(isFunction(mapper), 'A mapper function is required');

  const sequence : Sequence = asSequence(source);

  sequence.pipe(
    (upstream : UpstreamPipeline, downstream : DownstreamPipeline) : NullableBoolean => upstream(
      (value : any, key : PropertyKey, collection : IterableObject) : NullableBoolean => downstream(
        mapper(value, key, collection), key, collection,
      ),
    ),
  );

  return sequence;
}
