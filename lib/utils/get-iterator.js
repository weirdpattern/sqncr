/**
 * @flow
 * @module utils
 */

import isMap from './is-map';
import isSet from './is-set';
import isIterable from './is-iterable';

/*
 * @private
 * @function
 *
 * Creates an empty iterator in a completed state (done = true).
 * @return {Iterator} an empty iterator in a completed state.
 */
function getEmptyIterator() : Iterator {
  return {
    next: () : Iterator => ({ done: true }),
  };
}

/*
 * @private
 * @function
 *
 * Creates an index based iterator, suitable for arrays and strings.
 * @param  {(Array | String)} source the source of the iterator.
 * @return {Iterator}                an iterator that uses the indexes in `source` to move.
 */
function getIndexBasedIterator(source : Array | String) : Iterator {
  let index = -1;

  return {
    // eslint-disable-next-line arrow-body-style
    next: () : Iterator => {
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
 * @param  {(Array | String)} source the source of the iterator.
 * @return {Iterator}                an iterator that uses the keys in `source` to move.
 */
function getMapBasedIterator(source : Map) : Iterator {
  const iterator = source.keys();

  return {
    next: () : Iterator => {
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
 * @param  {(Array | String)} source the source of the iterator.
 * @return {Iterator}                an iterator that uses the values in `source` to move.
 */
function getSetBasedIterator(source : Set) : Iterator {
  const iterator = source.values();

  return {
    next: () : Iterator => {
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
 * Creates a key based iterator, suitable for objects.
 * @param  {Object}   source the source of the iterator.
 * @return {Iterator}        an iterator that uses the keys in `source` to move.
 */
function getKeyBasedIterator(source : Object) : Iterator {
  let index = -1;
  const keys = [].concat(
    Object.getOwnPropertyNames(source),
    typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(source) : []
  );

  return {
    // eslint-disable-next-line arrow-body-style
    next: () : Iterator => {
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
 * @param  {IterableObject} source the source to be wrapped.
 * @return {Iterator}              an iterator that will traverse `source` using an algorithm
 *                                 specific to the given iterable object.
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
export default function getIterator(source : IterableObject) : Iterator {
  if (source != null) {
    if (Array.isArray(source) || typeof source === 'string') {
      return getIndexBasedIterator(source);
    } else if (isMap(source)) {
      return getMapBasedIterator(source);
    } else if (isSet(source)) {
      return getSetBasedIterator(source);
    } else if (isIterable(source)) {
      return source[Symbol.iterator]();
    } else if (typeof source === 'object') {
      return getKeyBasedIterator(source);
    }
  }

  return getEmptyIterator();
}
