/**
 * @flow
 * @module utils
 */

import type {
  PropertyKey,
  IteratorLike,
  IterableObject,
  IteratorLikeResult,
} from '../types';

/*
 * @private
 * @function
 *
 * Creates an empty iterator in a completed state (done = true).
 * @return {IteratorLike} an empty iterator in a completed state.
 */
function getEmptyIterator() : IteratorLike {
  return {
    next: () : IteratorLikeResult => ({ done: true }),
  };
}

/*
 * @private
 * @function
 *
 * Creates an index based iterator, suitable for arrays and strings.
 * @param  {(Array.<*> | string)} source the source of the iterator.
 * @return {IteratorLike}                an iterator that uses the indexes in `source` to move.
 */
function getIndexBasedIterator(
  source : Array<any> | string,
) : IteratorLike {
  let index : number = -1;

  return {
    // eslint-disable-next-line arrow-body-style
    next: () : IteratorLikeResult => {
      return ++index < source.length
        ? { value: source[index], key: index, done: false }
        : { done: true };
    },
  };
}

/*
 * @private
 * @function
 *
 * Creates a map based iterator, suitable for maps.
 * @param  {Map.<*, *>}   source the source of the iterator.
 * @return {IteratorLike}        an iterator that uses the keys in `source` to move.
 */
function getMapBasedIterator(
  source : Map<any, any>,
) : IteratorLike {
  const iterator : Iterator<any> = source.keys();

  return {
    next: () : IteratorLikeResult => {
      const step = iterator.next();
      return !step.done
        ? { value: source.get(step.value), key: step.value, done: false }
        : { done: true };
    },
  };
}

/*
 * @private
 * @function
 *
 * Creates a set based iterator, suitable for sets.
 * @param  {Set.<*>}      source the source of the iterator.
 * @return {IteratorLike}        an iterator that uses the values in `source` to move.
 */
function getSetBasedIterator(
  source : Set<any>,
) : IteratorLike {
  const iterator : Iterator<any> = source.values();

  return {
    next: () : IteratorLikeResult => {
      const step = iterator.next();
      return !step.done
        ? { value: step.value, key: step.value, done: false }
        : { done: true };
    },
  };
}

/*
 * @private
 * @function
 *
 * Creates a iterator based iterator, suitable for iterables.
 * @param  {Iterable.<*>} source the source of the iterator.
 * @return {IteratorLike}        an iterator that uses the indexed items in `source` to move.
 */
function getIteratorBasedIterator(
  source : Iterable<any>,
) : IteratorLike {
  let index : number = -1;
  const iterator : Iterator<any> = source[Symbol.iterator]();

  return {
    next: () : IteratorLikeResult => {
      const step = iterator.next();
      return !step.done
        ? { value: step.value, key: ++index, done: false }
        : { done: true };
    },
  };
}

/*
 * @private
 * @function
 *
 * Creates a key based iterator, suitable for objects.
 * @param  {Object}       source the source of the iterator.
 * @return {IteratorLike}        an iterator that uses the keys in `source` to move.
 */
function getKeyBasedIterator(
  source : Object,
) : IteratorLike {
  let index : number = -1;

  let keys : Array<PropertyKey> = Object.getOwnPropertyNames(source);
  if (typeof Object.getOwnPropertySymbols === 'function') {
    keys = keys.concat(Object.getOwnPropertySymbols(source));
  }

  return {
    // eslint-disable-next-line arrow-body-style
    next: () : IteratorLikeResult => {
      return ++index < keys.length
        ? { value: source[keys[index]], key: keys[index], done: false }
        : { done: true };
    },
  };
}

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf utils
 *
 * Gets an iterator object that will allow the sequence to traverse the `source`.
 * @param  {IterableObject}       source the source to be wrapped.
 * @return {IteratorLike}        an iterator that will traverse `source` using an algorithm
 *                                       specific to the given iterable object.
 *
 * @example
 * const iterator = getIterator([1, 2, 3, 4]);
 *
 * let step = iterator.next();
 * while(!step.done) {
 *   console.log(step.value);
 *   step = iterator.next();
 * }
 *
 * // logs 1, 2, 3, 4
 */
export default function getIterator(
  source : IterableObject,
) : IteratorLike {
  if (source != null) {
    if (Array.isArray(source) || typeof source === 'string') {
      return getIndexBasedIterator(source);
    } else if (typeof Map === 'function' && source instanceof Map) {
      return getMapBasedIterator(source);
    } else if (typeof Set === 'function' && source instanceof Set) {
      return getSetBasedIterator(source);
    } else if (typeof Symbol === 'function' &&
               Symbol.iterator != null &&
               source[Symbol.iterator] === 'function') {
      return getIteratorBasedIterator(source);
    } else if (typeof source === 'object') {
      return getKeyBasedIterator(source);
    }
  }

  return getEmptyIterator();
}
