/**
 * @flow
 * @module sequence
 */

import dropPipeline from './api/drop';
import mapPipeline from './api/map';
import takePipeline from './api/take';
import reversePipeline from './api/reverse';
import reducePipeline from './api/reduce';
import toArrayPipeline from './api/to-array';
import getIterator from './utils/get-iterator';

import type {
  Mapper,
  Pipeline,
  Aggregator,
  IteratorLike,
  IterableObject,
  NullableBoolean,
  IteratorLikeResult,
  DownstreamPipeline,
} from './types';

/**
 * @public
 * @constructor
 * @since 1.0.0
 * @memberOf sequence
 *
 * Sequence class constructor.
 * @param {IterableObject} source the source of the sequence.
 */
export default function Sequence(source : IterableObject) {
  this.stream = (downstream : DownstreamPipeline) : NullableBoolean => {
    const iterator : IteratorLike = getIterator(source);
    let step : IteratorLikeResult = iterator.next();

    while (!step.done) {
      if (downstream(step.value, step.key, source) === false) {
        break;
      }
      step = iterator.next();
    }

    return true;
  };

  this.stream.source = source;
}

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf sequence
 *
 * Gets the original source of the sequence.
 * @return {IterableObject} the source of the sequence.
 *
 * @example
 * const sequence = new Sequence([1, 2, 3, 4]);
 * sequence.getSource(); // [1, 2, 3, 4]
 */
Sequence.prototype.getSource = function getSource() : IterableObject {
  return this.stream.source;
};

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf sequence
 *
 * Registers a new pipeline to the sequence providing new functionality.
 * @param  {Pipeline} pipeline the pipeline to be added.
 * @return {Sequence}          a sequence that can be used to chain further manipulations.
 *
 * @example
 * // drops the first 5 elements
 * Sequence.from([1, 2, 3, 4]).pipe((up, down) => {
 *   let dropped = 0;
 *   up((value, key, source) => {
 *     if (dropped++ < 5) {
 *       return undefined;
 *     }
 *
 *     return down(value, key, source);
 *   });
 * });
 */
Sequence.prototype.pipe = function pipe(pipeline : Pipeline) : Sequence {
  this.stream = pipeline.bind(null, this.stream);
  return this;
};

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf sequence
 *
 * @alias drop
 * @alias skip
 * @alias tail
 *
 * Drops `count` number of items from the sequence.
 * @param  {number}   [count = 1] the total number of items to be dropped.
 * @return {Sequence}             a sequence that can be used to chain further manipulations.
 *
 * @example
 * Sequence.from([1, 2, 3, 4]).drop().toArray();    // [2, 3, 4]
 * Sequence.from([1, 2, 3, 4]).skip().toArray();    // [2, 3, 4]
 * Sequence.from([1, 2, 3, 4]).tail().toArray();    // [2, 3, 4]
 * Sequence.from([1, 2, 3, 4]).drop(1).toArray();   // [2, 3, 4]
 * Sequence.from([1, 2, 3, 4]].drop(2).toArray();   // [3, 4]
 * Sequence.from([1, 2, 3, 4]).drop(100).toArray(); // []
 * Sequence.from([1, 2, 3, 4]).drop(-1).toArray();  // [1, 2, 3, 4]
 */
Sequence.prototype.drop =
Sequence.prototype.skip =
Sequence.prototype.tail = function drop(count : number = 1) : Sequence {
  return dropPipeline(this, count);
};

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf sequence
 *
 * Maps the items in the current sequence producing a new set of items.
 * @param  {Mapper}   mapper the function to be used to map the items.
 * @return {Sequence}        a sequence that can be used to chain further manipulations.
 *
 * @example
 * Sequence.from([1, 2, 3, 4]).map((value) => value + 1).toArray(); // [2, 3, 4, 5]
 *
 * const object = { one: 1, two: 2, three: 3, four: 4 };
 * Sequence.from(object).toArray();                                 // [1, 2, 3, 4]
 * Sequence.from(object).map((_, key) => key).toArray();            // ['one', 'two', 'three', 'four']
 */
Sequence.prototype.map = function map(mapper : Mapper) : Sequence {
  return mapPipeline(this, mapper);
};

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf sequence
 *
 * @alias take
 * @alias first
 * @alias head
 *
 * Takes `count` number of items from the sequence.
 * @param  {number}         [count] the total number of items to be taken.
 * @return {(Sequence | *)}         a sequence that can be used to chain further manipulations or
 *                                  the first element of the sequence if no count was provided.
 *
 * @example
 * Sequence.from([1, 2, 3, 4]).take().toArray();    // [1]
 * Sequence.from([1, 2, 3, 4]).first().toArray();   // [1]
 * Sequence.from([1, 2, 3, 4]).head().toArray();    // [1]
 * Sequence.from([1, 2, 3, 4]).take(1).toArray();   // [1]
 * Sequence.from([1, 2, 3, 4]].take(2).toArray();   // [1, 2]
 * Sequence.from([1, 2, 3, 4]).take(100).toArray(); // [1, 2, 3, 4]
 * Sequence.from([1, 2, 3, 4]).take(-1).toArray();  // []
 */
Sequence.prototype.take =
Sequence.prototype.head =
Sequence.prototype.first = function take(count? : number) : Sequence {
  return takePipeline(this, count);
};

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf sequence
 *
 * Reverses the current sequence.
 * @return {Sequence} the reversed sequence.
 *
 * @example
 * Sequence.from([1, 2, 3, 4]).reverse().toArray();      // [4, 3, 2, 1]
 * Sequence.from({ one: 1, two: 2}).reverse().toArray(); // [2, 1]
 */
Sequence.prototype.reverse = function reverse() : Sequence {
  return reversePipeline(this);
};

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf sequence
 *
 * Reduces the current sequence using the `aggregator` function and the `initial` value.
 * @param  {Aggregator.<T>} aggregator the function to be used to collect the values.
 * @param  {*}              [initial]  the initial value to be used.
 * @return {T}                         the reduced sequence.
 * @throws {GuardError}                when `aggregator` is not a function.
 *
 * @example
 * Sequence.from([1, 2, 3, 4]).reduce(
 *   (accumulator, value) => [...accumulator, value * 2], []
 * ); // [2, 4, 6, 8]
 *
 * Sequence.generate(() => {
 *   let x = 1;
 *   let y = 1;
 *   return () {
 *     let prev = x;
 *     x = y;
 *     y += prev;
 *     return prev;
 *   };
 * }(), 10).reduce(
 *   (accumulator, value) => [...accumulator, value * 2], []
 * ); // [2, 2, 4, 6, 10, 16, 26, 42, 68, 110, ...]
 */
Sequence.prototype.reduce = function reduce<T : IterableObject>(
  aggregator : Aggregator<T>, initial : T
) : T {
  return reducePipeline(this, aggregator, initial);
};

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf sequence
 *
 * Converts the current sequence into an array, applying any operation in the pipeline.
 * @returns {Array.<*>} an array containing the resolved values in the sequence.
 *
 * @example
 * Sequence.from([1, 2, 3, 4]).toArray();      // [1, 2, 3, 4]
 * Sequence.from({ one: 1, two: 2}).toArray(); // [1, 2]
 *
 * const map = new Map();
 * map.set(1, 'hello');
 * map.set(2, 'good bye');
 * Sequence.from(map).toArray();               // ['hello', 'good bye']
 *
 * const set = new Set();
 * set.add(1);
 * set.add(2);
 * set.add(3);
 * Sequence.from(set).toArray();               // [1, 2, 3]
 */
Sequence.prototype.toArray = function toArray() : Array<any> {
  return toArrayPipeline(this);
};
