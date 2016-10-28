/**
 * @flow
 * @module sequence
 */

import guard from './utils/guard';
import isIterable from './utils/is-iterable';
import getIterator from './utils/get-iterator';

import {
  implement,
  addPrototype,
  SequenceGenerator,
} from './generator/sequence-generator';

import type {
  Entry,
  ItemCallback,
  PropertyKey,
} from './types';

// **************************************
// **************** API *****************
// **************************************

import all from './api/all';

export { all, all as every };
export { default as chunk } from './api/chunk';
export { default as compact } from './api/compact';

// **************************************
// ************** UTILS *****************
// **************************************

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * Determines if [candidate] is a SequenceGenerator.
 *
 * @param {mixed} candidate
 *        The candidate to be evaluated.
 * @returns {boolean} `true` when [candidate] is a SequenceGenerator; `false` otherwise.
 */
export function isSequence(candidate : mixed) : boolean {
  return candidate instanceof SequenceGenerator;
}

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * Enumerates each of the properties in [object].
 *
 * @param {Object} source
 *        The object whose properties we need to enumerate.
 * @returns {Iterator.<PropertyKey>} the key (string, number or symbol) inside [object].
 */
export function* enumerate(source : Object) : Iterator<PropertyKey> {
  let current : Object = source;
  while (current != null) {
    const properties : Array<PropertyKey> = Object.keys(current);

    let index : number = -1;
    const length : number = properties.length;
    while (++index < length) {
      yield properties[index];
    }

    current = Object.getPrototypeOf(current);
  }
}

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * Creates chunks of length [size] from [iterable].
 * The end element of each chunk is the start element of the next chunk.
 *
 * @param {Iterable.<mixed>} iterable
 *        The iterable object to be processed.
 * @param {number} [size=2]
 *        The size of the sub-arrays to be created.
 * @returns {Iterator.<Array.<mixed>>} the compacted iterable object.
 */
export const consecutive = implement(
  'consecutive',
  function* consecutive(iterable : Iterable<mixed>, size : number = 2) : Iterator<Array<mixed>> {
    const items : Array<mixed> = [];

    for (const item : mixed of iterable) {
      items.push(item);
      if (items.length === size) {
        yield [].concat(items.splice(0, size - 1), items);
      }
    }

    if (items.length > 0) {
      yield items;
    }
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * Creates a generator that will drop/skip the first [count] values of a sequence.
 *
 * @param {Iterable.<mixed>} iterable
 *        The iterable object to be processed.
 * @param {number} [count = 1]
 *        The number of elements to be dropped/skipped.
 * @returns {mixed} the remaining values in [iterable].
 */
export const drop = implement(
  ['drop', 'skip'],
  function* drop(iterable : Iterable<mixed>, count : number = 1) : mixed {
    assert(typeof count === 'number' && !Number.isNaN(count), 'Expecting a number');

    const iterator : Iterator<mixed> = getIterator(iterable);

    let total : number = Math.max(count, 0);
    while (total-- > 0) {
      if (iterator.next().done) {
        return;
      }
    }

    yield* iterator;
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * Creates a generator that will drop/skip values of a sequence until at [predicate] is fulfilled.
 *
 * @param {Iterable.<mixed>} iterable
 *        The iterable object to be processed.
 * @param {ItemCallback} predicate
 *        The predicate to be evaluated per item.
 * @returns {mixed} the remaining values in [iterable] after the predicate has been fulfilled
 *                  by at least one item.
 *
 * @alias skipWhile
 */
export const dropWhile = implement(
  ['dropWhile', 'skipWhile'],
  function* dropWhile(iterable : Iterable<mixed>, predicate : ItemCallback) : mixed {
    let index = 0;
    for (const item : mixed of iterable) {
      if (predicate(item, index++, iterable) === false) {
        break;
      }
    }

    yield* iterable;
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * @see dropWhile
 * @alias dropWhile
 */
export const skipWhile = dropWhile;

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * Creates a consumer that will call [callback] for each item in [iterable].
 *
 * @param {Iterable.<mixed>} iterable
 *        The iterable object to be processed.
 * @param {ItemCallback} callback
 *        The callback to be applied per item.
 *
 * @alias foreach
 * @alias forEach
 */
export const each = implement(
  ['each', 'foreach', 'forEach'],
  (iterable : Iterable<mixed>, callback : ItemCallback) => {
    let index = 0;
    for (const item : mixed of iterable) {
      if (callback(item, index++, iterable) === false) {
        break;
      }
    }
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * @see each
 * @alias each
 * @alias forEach
 */
export const foreach = each;

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * @see each
 * @alias each
 * @alias foreach
 */
export const forEach = each;

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * Creates a generator that will only yield values that fulfill [predicate].
 *
 * @param {Iterable.<mixed>} iterable
 *        The iterable object to be processed.
 * @param {ItemCallback} predicate
 *        The predicate to be evaluated.
 * @returns {mixed} each of the items that fulfill [predicate].
 */
export const filter = implement(
  'filter',
  function* filter(iterable : Iterable<mixed>, predicate : ItemCallback) : mixed {
    let index = 0;
    for (const item : mixed of iterable) {
      if (predicate(item, index++, iterable) === true) {
        yield item;
      }
    }
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * Creates a consumer that will return the first item that fulfills [predicate].
 *
 * @param {Iterable.<mixed>} iterable
 *        The iterable object to be processed.
 * @param {ItemCallback} predicate
 *        The predicate to be evaluated.
 * @returns {mixed} the first item that fulfill [predicate] or undefined if none does.
 */
export const find = implement(
  'find',
  (iterable : Iterable<mixed>, predicate : ItemCallback) : mixed => {
    let index = 0;
    for (const item : mixed of iterable) {
      if (predicate(item, index++, iterable) === true) {
        return item;
      }
    }

    return undefined;
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * Creates a generator that will yield the first [count] number of items.
 *
 * @param {Iterable.<mixed>} iterable
 *        The iterable object to be processed.
 * @param {number} [count = 1]
 *        The number of items to be returned.
 * @returns {mixed} the first [count] items of [iterable].
 */
export const first = implement(
  'first',
  function* first(iterable : Iterable<mixed>, count : number = 1) : mixed {
    const items : Array<mixed> = [];

    for (const item : mixed of iterable) {
      items.push(item);
      if (items.length === count) {
        break;
      }
    }

    yield* items;
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * Creates a generator that will flat the each and every item before yielding.
 *
 * @param {Iterable.<mixed>} iterable
 *        The iterable object to be processed.
 * @param {boolean} [flattenStrings = true]
 *        A flag indicating whether strings should be flattened too.
 * @returns {mixed} each of the items in [iterable] and any other inner iterable object
 *                contained in [iterable].
 */
export const flat = implement(
  ['flat', 'flatten'],
  function* flat(iterable : Iterable<mixed>, flatStrings : boolean = true) : mixed {
    for (const item : mixed of iterable) {
      if (isIterable(item) && (typeof item !== 'string' || flatStrings)) {
        yield* flat(item, flatStrings);
      } else {
        yield item;
      }
    }
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * @see flat
 * @alias flat
 */
export const flatten = flat;

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * Creates a generator that will return the items at specific indexes.
 *
 * @param {Iterable.<mixed>} iterable
 *        The iterable object to be processed.
 * @param {Array.<number>} indexes
 *        One or more indexes to be returned.
 * @returns {mixed} each of the items in [iterable] whose index was requested.
 *
 * @alias items
 */
export const get = implement(
  ['get', 'items'],
  function* items(iterable : Iterable<mixed>, ...indexes : Array<number>) : mixed {
    let count : number = 0;
    for (const item : mixed of iterable) {
      if (indexes.indexOf(count++) > -1) {
        yield item;
      }
    }
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * @see get
 * @alias get
 */
export const items = get;

// **************************************
// ************* SEQUENCE ***************
// **************************************

/**
 * @public
 * @constant
 * @since 1.0.0
 *
 * Contains all the possible sequencers that can be used to generate a sequence.
 */
const Sequence : Object = {
  /**
   * @public
   * @since 1.0.0
   *
   * Generates a new sequence from [iterable].
   *
   * @param {Iterable.<mixed>} iterable
   *        The iterable object to be created.
   * @returns {SequenceGenerator} the [iterable] object as a SequenceGenerator.
   * @throws {TypeError} when [iterable] is not an iterable object.
   */
  from: (iterable : Iterable<mixed>) : SequenceGenerator => {
    assert(isIterable(iterable), 'Expecting an iterable object');
    return new SequenceGenerator(iterable);
  },
};

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * A sequencer that creates a generator that counts up from [start] in increments of [step].
 *
 * @param {number} [start = 0]
 *        The start of the counter.
 * @param {number} [step = 1]
 *        The rate by which to increment the counter.
 * @returns {Iterator.<number>} the current count.
 */
export const counter = Sequence.counter = addPrototype(
  function* counter(start : number = 0, step : number = 1) : Iterator<number> {
    assert(typeof start === 'number' && !Number.isNaN(start), 'Expecting a number');
    assert(typeof step === 'number' && !Number.isNaN(step), 'Expecting a number');

    let count : number = start;
    while (count < Infinity) {
      yield count;
      count += step;
    }
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * A sequencer that creates a generator that counts up from [start] to [stop]
 * in increments of [step].
 *
 * @param {number} [start = 0]
 *        The start of the range.
 * @param {number} [stop]
 *        The end of the range.
 * @param {number} [step = 1]
 *        The rate by which to increment the counter.
 * @returns {Iterator.<number>} the current count.
 */
export const range = Sequence.range = addPrototype(
  function* range(start : number = 0, stop? : number, step : number = 1) : Iterator<number> {
    assert(typeof start === 'number' && !Number.isNaN(start), 'Expecting a number');
    assert(typeof step === 'number' && !Number.isNaN(step), 'Expecting a number');

    if (stop != null) {
      assert((typeof stop === 'number' && !Number.isNaN(stop)), 'Expecting a number');
    }

    let count : number = start;

    const until : number = stop == null ? (count = 0, start) : stop;
    const total : number = Math.max(Math.ceil((until - count) / step), 0);

    let index : number = -1;
    while (++index < total) {
      yield count;
      count += step;
    }
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * A sequencer that repeats a [value], [times] number of times.
 *
 * @param {mixed} value
 *        The value to be repeated [times] times.
 * @param {number} [times = Infinity]
 *        The number of times to repeat [value].
 * @returns {Iterator.<mixed>} the same [value].
 */
export const repeat = Sequence.repeat = addPrototype(
  function* repeat(value : mixed, times : number = Infinity) : Iterator<mixed> {
    let count : number = times;

    while (count-- > 0) {
      yield value;
    }
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * A sequencer that enumerates the keys in [object].
 *
 * @param {any} source
 *        The object whose keys we want to enumerate.
 * @param {boolean} owned
 *        A flag indicating whether owned properties are needed or every property in [object].
 * @return {Iterator.<Entry>} the key (string, number or symbol) inside [object].
 */
export const entries = Sequence.entries = addPrototype(
  function* entries(source : any, owned : boolean = true) : Iterator<Entry> {
    assert(source != null, 'Expecting a valid object');

    const keys = (owned === true ? Object.keys : enumerate)(source);

    let key;
    let index : number = -1;
    const length : number = keys.length;
    while (++index < length) {
      key = keys[index];
      yield [key, source[key]];
    }
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * A sequencer that enumerates the keys in [object].
 *
 * @param {any} source
 *        The object whose keys we want to enumerate.
 * @param {boolean} [owned = true]
 *        A flag indicating whether owned properties are needed or every property in [object].
 * @return {Iterator.<PropertyKey>} the key (string, number or symbol) inside [object].
 */
export const keys = Sequence.keys = addPrototype(
  function* keys(source : any, owned : boolean = true) : Iterator<PropertyKey> {
    assert(source != null, 'Expecting a valid object');

    const extractor = owned ? Object.keys : enumerate;
    yield* extractor(source);
  }
);

/**
 * @public
 * @function
 * @since 1.0.0
 *
 * A sequencer that enumerates the values in [object].
 *
 * @param {any} source
 *        The object whose values we want to enumerate.
 * @param {boolean} [owned = true]
 *        A flag indicating whether only properties are needed or every property in [object].
 * @return {Iterator.<mixed>} the value inside [object].
 */
export const values = Sequence.values = addPrototype(
  function* values(source : any, owned : boolean = true) : Iterator<mixed> {
    assert(source != null, 'Expecting a valid object');

    const extractor = owned ? Object.keys : enumerate;
    for (const key : PropertyKey of extractor(source)) {
      yield source[key];
    }
  }
);

export default Sequence;

/*
 export const matrix =
 SequenceGenerator.prototype.matrix = addPrototype(
 (...iterables : Iterable) : Generator => {
 const product = addPrototype(
 function* product(chain : Array<any>, iterable : Iterable) : Array {
 for (const tuple : any of chain) {
 for (const item : any of iterable) {
 yield tuple.concat(item);
 }
 }
 }
 );

 return iterables.reduce(product, getIterator([[]]));
 }
 );

 export const takeWhile =
 SequenceGenerator.prototype.takeWhile = addPrototype(
 function* takeWhile(iterable : Iterable, predicate : TakeWhilePredicate, $this? : any) : any {
 for (const item : any of iterable) {
 if (!predicate.call($this, item)) {
 return;
 }
 yield item;
 }
 }
 );
 */
