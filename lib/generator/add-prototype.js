/**
 * @flow
 * @module generator
 */

import { $$GENERATOR } from '../utils/constants';
import SequenceGenerator from './sequence-generator';

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf generator
 *
 * Adds the SequenceGenerator prototype to the given generator, thus enabling chaining.
 * @param  {Method} method the method to be modified.
 * @return {Method}        the same method with the SequenceGenerator prototype.
 */
export default function addPrototype(method : Method) : Method {
  const prospect : Method = method;

  if (prospect instanceof $$GENERATOR) {
    prospect.prototype = SequenceGenerator.prototype;
  }

  return prospect;
}
