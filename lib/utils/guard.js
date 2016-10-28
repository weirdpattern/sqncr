/**
 * @flow
 * @module utils
 */

/**
 * @public
 * @constructor
 * @since 1.0.0
 * @memberOf utils
 *
 * Represents an error in a guarded condition.
 * @param {string} message the message of the error.
 */
export function GuardError(message : string) {
  this.message = message;

  const stack = new Error().stack.match(/[^\s]+$/);
  this.stack = `${this.name} at ${stack != null ? stack.join('\n') : ''}`;
}

Object.setPrototypeOf(GuardError, Error);
GuardError.prototype = Object.create(Error.prototype);

GuardError.prototype.name = 'GuardError';
GuardError.prototype.message = '';
GuardError.prototype.constructor = GuardError;

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf utils
 *
 * Throws an exception when `conditional` is false.
 * The `conditional` won't be coerced, so passing a `falsy` value won't throw an exception.
 * @param {boolean}  conditional    the value to validate.
 * @param {string}   message        the error message to be displayed when `conditional` is `false`.
 *                                  The format supports a limited version of `printf` standard.
 *                                  %s are replaced everything else gets ignored.
 * @param {Array<*>} [replacements] the replace values, if any.
 * @throws {GuardError} when the conditional is not met.
 *
 * @example
 * const value = null;
 *
 * guard(value === null, 'value must be null');               // ok
 *
 * guard(value != null, 'value must have a value');           // throws GuardError ('value must have a value')
 * guard(value === undefined, 'value must be undefined');     // throws GuardError ('value must be undefined')
 * guard(value != null, '{0} must have a value', 'variable'); // throws GuardError ('variable must have a value')
 */
export default function guard(conditional : boolean,
                              message : string,
                              ...replacements : Array<any>) {
  if (conditional === false) {
    throw new GuardError(
      message.replace(/%s/g, () : any => replacements.shift())
    );
  }
}
