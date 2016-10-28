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
export type NullableBoolean = boolean | null | undefined;

/**
 * @typedef {(Iterable<mixed> | Object)} IterableObject.
 */
export type IterableObject = Iterable<mixed> | Object | Sequence;

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
export type Pipeline =(
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
) => T

//

/**
 * @callback SequenceGenerator
 * @param  {Array.<*>}      [args] the possible arguments of the generator.
 * @return {IterableObject}        an iterable object that can be converted into a sequence.
 */
export type SequenceGenerator = (...args : Array<any>) => IterableObject;

/**
 * @typedef {(Generator.<mixed, mixed, mixed> | Function)} Method.
 */
export type Method = Generator<mixed, mixed, mixed> | Function;

/**
 * @typedef {[PropertyKey | mixed]} Entry.
 */
export type Entry = [PropertyKey, mixed];

/**
 * @typedef {(string | Array<string>)} Alias.
 */
export type Alias = string | Array<string>;

/**
 * @callback ItemCallback
 * @param {mixed} item
 *        The item being processed.
 * @param {number} index
 *        The index of the item inside [iterable].
 * @param {Iterable.<mixed>} iterable
 *        The collection being processed.
 * @returns {boolean} `false` to stop the current iteration; any other to let it continue.
 */
export type ItemCallback = (item : mixed, index : number, iterable : Iterable<mixed>) => boolean;
