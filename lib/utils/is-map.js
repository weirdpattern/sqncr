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
 * Determine if `candidate` is a map object.
 * @param  {*}       candidate the value to be evaluated.
 * @return {boolean}           `true` when `candidate` is a map object.
 *
 * @example
 * isMap(new Map());    // true
 * isMap('hi');         // false
 * isMap([1, 2, 3, 4]); // false
 * isMap(new Set());    // false
 * isMap({});           // false
 * isMap(() => {});     // false
 * isMap(1);            // false
 * isMap(true);         // false
 */
export default function isMap(candidate : any) : boolean {
  return typeof Map === 'function' && candidate instanceof Map;
}
