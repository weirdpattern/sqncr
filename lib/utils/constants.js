/**
 * @flow
 * @utils
 */

/**
 * @public
 * @constant
 * @since 1.0.0
 * @memberOf utils
 *
 * The symbol that identifies the iterator function in iterable objects.
 */
export const $$ITERATOR = typeof Symbol === 'function' ? Symbol.iterator : '@@iterator';

/**
 * @public
 * @constant
 * @since 1.0.0
 * @memberOf utils
 *
 * The constructor function of all generators.
 */
export const $$GENERATOR = function* Generator() : Generator<mixed, mixed, mixed> {
  /* empty */
}.constructor;