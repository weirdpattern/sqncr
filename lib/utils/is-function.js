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
 * Validates `target` is a function.
 * @param  {any}     target the value to validate.
 * @return {boolean}         `true` when `target` is a function; `false` otherwise.
 *
 * @example
 * function test() {}
 *
 * isFunction(test);          // true
 * isFunction(() => {});      // true
 * isFunction(function() {}); // true
 *
 * isFunction(1);             // false
 * isFunction(false);         // false
 * isFunction('hello');       // false
 * isFunction({});            // false
 */
export default function isFunction(
  target : any,
) : boolean {
  return target != null && typeof target === 'function';
}
