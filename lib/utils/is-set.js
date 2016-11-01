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
 * Determine if `candidate` is a set object.
 * @param  {*}       candidate the value to be evaluated.
 * @return {boolean}           `true` when `candidate` is a set object.
 *
 * @example
 * isSet(new Set());    // true
 * isSet('hi');         // false
 * isSet([1, 2, 3, 4]); // false
 * isSet(new Map());    // false
 * isSet({});           // false
 * isSet(() => {});     // false
 * isSet(1);            // false
 * isSet(true);         // false
 */
export default function isSet(candidate : any) : boolean {
  return typeof Set === 'function' && candidate instanceof Set;
}
