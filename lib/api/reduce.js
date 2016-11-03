/**
 * @flow
 * @module api
 */

import Sequence from '../sequence';
import guard from '../utils/guard';
import isFunction from '../utils/is-function';
import asSequence from '../utils/as-sequence';

import type {
  Aggregator,
  PropertyKey,
  IterableObject,
} from '../types';

/*
 * @private
 * @function
 *
 * Gets the proper object based off of the type of source.
 * @param  {IterableObject} source the source to be validated.
 * @return {IterableObject}        a new instance of the same iterable object.
 */
function createFrom(source : IterableObject) : IterableObject {
  switch (typeof source) {
    case 'string':
      return '';

    case 'object':
      if (Array.isArray(source)) {
        return [];
      } else if (typeof Map === 'function' && source instanceof Map) {
        return new Map();
      } else if (typeof Set === 'function' && source instanceof Set) {
        return new Set();
      } else if (typeof Float32Array === 'function' && source instanceof Float32Array) {
        return new Float32Array(source.length);
      } else if (typeof Float64Array === 'function' && source instanceof Float64Array) {
        return new Float64Array(source.length);
      } else if (typeof Int8Array === 'function' && source instanceof Int8Array) {
        return new Int8Array(source.length);
      } else if (typeof Int16Array === 'function' && source instanceof Int16Array) {
        return new Int16Array(source.length);
      } else if (typeof Int32Array === 'function' && source instanceof Int32Array) {
        return new Int32Array(source.length);
      } else if (typeof Uint8Array === 'function' && source instanceof Uint8Array) {
        return new Uint8Array(source.length);
      } else if (typeof Uint8ClampedArray === 'function' && source instanceof Uint8ClampedArray) {
        return new Uint8ClampedArray(source.length);
      } else if (typeof Uint16Array === 'function' && source instanceof Uint16Array) {
        return new Uint16Array(source.length);
      } else if (typeof Uint32Array === 'function' && source instanceof Uint32Array) {
        return new Uint32Array(source.length);
      }
      return {};

    default:
      return {};
  }
}

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf api
 * @see Sequence.reduce
 */
export default function reduce<T : IterableObject>(source : IterableObject | Sequence,
                                                   aggregator : Aggregator<T>,
                                                   initial : T) : T {
  const sequence : Sequence = asSequence(source);
  guard(isFunction(aggregator), 'An aggregator function is required');

  let reduced : any = initial == null ? createFrom(sequence.source) : initial;
  sequence.stream((value : any, key : PropertyKey, iterable : IterableObject) => {
    reduced = aggregator(reduced, value, key, iterable);
  });

  return reduced;
}
