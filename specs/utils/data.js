/**
 * @module specs
 * @author Pat Treznov <patricio@weirdpattern.com>
 */

/**
 * @public
 * @function
 * @memberof specs
 * @since 1.0.0
 *
 * Generates data.
 *
 * @param {any} type
 *        The type of data to be generated.
 * @param {number} length
 *        The number of elements to be generated.
 * @returns {Data} the new data.
 */
export default function generate(type, length : number) {
  switch (type) {
    case String:
      return Math.round(
        Math.pow(36, length + 1) - (Math.random() * Math.pow(36, length))
      ).toString(36).slice(1);
    case Array:
      return Array.from(Array(length), (_, i) => i + 1);
    case Map:
      return new Map(Array.from(Array(length), (_, i) => [i + 1, i + 1]));
    case Set:
      return new Set(Array.from(Array(length), (_, i) => i + 1));
    case Float32Array:
      return Float32Array.from(Array(length), (_, i) => i + 1);
    case Float64Array:
      return Float64Array.from(Array(length), (_, i) => i + 1);
    case Int8Array:
      return Int8Array.from(Array(length), (_, i) => i + 1);
    case Int16Array:
      return Int16Array.from(Array(length), (_, i) => i + 1);
    case Int32Array:
      return Int32Array.from(Array(length), (_, i) => i + 1);
    case Uint8Array:
      return Uint8Array.from(Array(length), (_, i) => i + 1);
    case Uint16Array:
      return Uint16Array.from(Array(length), (_, i) => i + 1);
    case Uint32Array:
      return Uint32Array.from(Array(length), (_, i) => i + 1);
    default:
      return [];
  }
}
