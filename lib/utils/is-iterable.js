/**
 * @flow
 * @module utils
 */

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf utils
 *
 * Determine if `candidate` is an iterable object.
 * @param  {*}       candidate the value to be evaluated.
 * @return {boolean}           `true` when `candidate` is an iterable object.
 *
 * @example
 * isIterable('');           // true
 * isIterable('hi');         // true
 * isIterable([1, 2, 3, 4]); // true
 * isIterable(new Map());    // true
 * isIterable(new Set());    // true
 * isIterable({});           // false
 * isIterable(() => {});     // false
 * isIterable(1);            // false
 * isIterable(true);         // false
 */
export default function isIterable(candidate : any) : boolean {
  return typeof Symbol === 'function' &&
         typeof Symbol.iterator === 'symbol' &&
         typeof candidate[Symbol.iterator] === 'function';
}
