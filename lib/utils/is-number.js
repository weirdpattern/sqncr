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
 * Determines if `candidate` is a numeric and finite number.
 * Values like +Infinity, -Infinity and NaN are considered numeric, but not numbers.
 * @param  {*}       candidate the value to be evaluated.
 * @return {boolean}           `true` when candidate is a number.
 *
 * @example
 * isNumber(-1);        // true
 * isNumber(0);         // true
 * isNumber(1);         // true
 * isNumber(-1.1);      // true
 * isNumber(1.1);       // true
 * isNumber(Infinity);  // false
 * isNumber(-Infinity); // false
 * isNumber(NaN);       // false
 * isNumber('1');       // false
 * isNumber({});        // false
 * isNumber([]);        // false
 */
export default function isNumber(
  candidate : any,
) : boolean {
  return typeof candidate === 'number' && isFinite(candidate);
}
