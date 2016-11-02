/**
 * @flow
 * @module types
 */

/**
 * @typedef {(string | number | Symbol)} PropertyKey.
 */
export type PropertyKey = string | number | Symbol;

/**
 * @typedef {(boolean | null | undefined)} NullableBoolean.
 */
export type NullableBoolean = boolean | null | typeof undefined;

/**
 * @typedef {(Iterable.<*> | Object)} IterableObject.
 */
export type IterableObject = Iterable<any> | Object;

/**
 * @typedef {Object} KeyedItem
 * @property {*} key   the key of the item.
 * @property {*} entry the value of the item
 */
export type KeyedItem = {
  key : any,
  entry : any,
};

/**
 * @typedef {Object} IteratorLikeResult
 * @property {*}       key   the key of the current item.
 * @property {*}       value the value of the current item.
 * @property {boolean} done  a flag indicating whether the iterator has completed.
 */
export type IteratorLikeResult = {
  key : any,
  value : any,
  done : false,
} | {
  done : true,
};

/**
 * #typedef {Object} NextIterator
 * @property {Function} next the next value getter.
 */
export type IteratorLike = {
  next : () => IteratorLikeResult,
};

/**
 * @callback DownstreamPipeline
 * @param  {*}               any    the value of the item being sent through the pipeline.
 * @param  {PropertyKey}     key    the key of the item being sent through the pipeline.
 * @param  {IterableObject}  source the original source of the item.
 * @return {NullableBoolean}        `false` to stop the pipeline.
 */
export type DownstreamPipeline = (
  value : any,
  key : PropertyKey,
  source : IterableObject
) => NullableBoolean;

/**
 * @callback UpstreamPipeline
 * @param  {DownstreamPipeline} pipeline the pipeline to be linked.
 * @return {NullableBoolean}             `true` to indicate a successful completion of the pipeline.
 */
export type UpstreamPipeline = (
  pipeline : DownstreamPipeline
) => NullableBoolean;

/**
 * @callback Pipeline
 * @param  {UpstreamPipeline}   upstream   the upstream pipeline.
 * @param  {DownstreamPipeline} downstream the downstream pipeline.
 * @return {NullableBoolean}               `true` to indicate a successful completion of the pipeline.
 */
export type Pipeline = (
  upstream : UpstreamPipeline,
  downstream : DownstreamPipeline
) => NullableBoolean;

/**
 * @callback Aggregator
 * @param  {T}              aggregator the object to be used to aggregate.
 * @param  {*}              value      the value of the item being aggregated.
 * @param  {PropertyKey}    [key]      the key of the item being aggregated.
 * @param  {IterableObject} [source]   the original source of the item.
 * @return {T}                         the aggregator passed as argument.
 */
export type Aggregator<T> = (
  aggregator : T,
  value : any,
  key? : PropertyKey,
  source? : IterableObject
) => T;

/**
 * @callback Mapper
 * @param  {*}              value    the value of the item being mapped.
 * @param  {PropertyKey}    [key]    the key of the item being mapped.
 * @param  {IterableObject} [source] the original source of the item.
 */
export type Mapper = (
  value : any,
  key? : PropertyKey,
  source? : IterableObject
) => any;
