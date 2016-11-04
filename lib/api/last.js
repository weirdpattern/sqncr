/**
 * @flow
 * @module api
 */

import Sequence from '../sequence';
import guard from '../utils/guard';
import isNumber from '../utils/is-number';
import asSequence from '../utils/as-sequence';

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf api
 * @see Sequence.last
 */
export default function last(
  source : IterableObject | Sequence,
  count : number = 1
) : Sequence | any {
  guard(isNumber(count), 'expecting a number');

  const sequence = asSequence(source);
  if (count === 1) {
    const items = asSequence(source).toArray();
    if (items.length > 0) {
      return items[items.length - 1];
    }
  }

  let skipped = -1;
  sequence.pipe(
    // eslint-disable-next-line arrow-body-style
    (upstream : UpstreamPipeline, downstream : DownstreamPipeline) : NullableBoolean => {
      return upstream(
        (value : any, key : PropertyKey, collection : IterableObject) : NullableBoolean => {
          

          return downstream(value, key, collection);
        }
      );
    }
  );

  return sequence;
}
