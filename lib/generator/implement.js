/**
 * @flow
 * @module generator
 */

import { Alias } from '../types';
import addPrototype from './add-prototype';
import SequenceGenerator from './sequence-generator';

/**
 * @public
 * @function
 * @since 1.0.0
 * @memberOf generator
 *
 * Adds the SequenceGenerator prototype to the given method and adds the resulting prospect
 * to the actual SequenceGenerator prototype, thus exposing it as a method.
 * @param  {Alias}  alias  the name of the method.
 * @param  {Method} method the method to be modified.
 * @return {Method}        the same method with the SequenceGenerator prototype.
 */
export default function implement(alias : Alias, method : Method) : Method {
  const prospect : any = addPrototype(method);
  const aliases : Array<string> = Array.isArray(alias) ? alias : [alias];

  while (aliases.length) {
    SequenceGenerator.prototype[aliases.pop()] =
      (...args : Array<mixed>) : mixed => prospect(this, ...args);
  }

  return prospect;
}
