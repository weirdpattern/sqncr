import execute from '../base';
import drop from '../../lib/api/drop';
import Sequence from '../../lib/sequence';
import { GuardError } from '../../lib/utils/guard';

describe('api', () => {
  describe('drop', () => {
    execute({
      'defaults to 1 when no drop count is passed': {
        input: drop('unexpected').toArray().join(''),
        output: 'nexpected',
      },
      'throws when drop count is not a number': {
        criteria: 'toThrowError',
        input: [
          () => drop('unexpected', '1').toArray().join(''),
          () => drop('unexpected', 'a').toArray().join(''),
          () => drop('unexpected', { one: 1 }).toArray().join(''),
          () => drop('unexpected', [1]).toArray().join(''),
          () => drop('unexpected', Infinity).toArray().join(''),
          () => drop('unexpected', -Infinity).toArray().join(''),
          () => drop('unexpected', NaN).toArray().join(''),
        ],
        output: {
          value: GuardError,
        },
      },
      'returns the same input when using drop count lesser than 1': {
        input: [
          drop('unexpected', -2).toArray().join(''),
          drop('unexpected', -1).toArray().join(''),
          drop('unexpected', 0).toArray().join(''),
        ],
        output: 'unexpected',
      },
      'returns the empty when the count is greater than the length of the input': {
        input: [
          drop('unexpected', 100).toArray().join(''),
          drop('unexpected', 200).toArray().join(''),
          drop('unexpected', 300).toArray().join(''),
        ],
        output: '',
      },
      'works with strings': {
        input: drop('unexpected', 2).toArray().join(''),
        output: 'expected',
      },
      'works with arrays': {
        criteria: 'toEqual',
        input: [drop([1, 2, 3, 4], 2).toArray()],
        output: {
          value: [3, 4],
        },
      },
      'works with maps': {
        criteria: 'toEqual',
        input: [drop(new Map([[1, 1], [2, 2], [3, 3], [4, 4]]), 2).toArray()],
        output: {
          value: [3, 4],
        },
      },
      'works with sets': {
        criteria: 'toEqual',
        input: [drop(new Set([1, 2, 3, 4]), 2).toArray()],
        output: {
          value: [3, 4],
        },
      },
      'works with typed arrays': {
        criteria: 'toEqual',
        input: [
          drop(new Float32Array([1, 2, 3, 4]), 2).toArray(),
          drop(new Float64Array([1, 2, 3, 4]), 2).toArray(),
          drop(new Int8Array([1, 2, 3, 4]), 2).toArray(),
          drop(new Int16Array([1, 2, 3, 4]), 2).toArray(),
          drop(new Int32Array([1, 2, 3, 4]), 2).toArray(),
          drop(new Uint8Array([1, 2, 3, 4]), 2).toArray(),
          drop(new Uint8ClampedArray([1, 2, 3, 4]), 2).toArray(),
          drop(new Uint16Array([1, 2, 3, 4]), 2).toArray(),
          drop(new Uint32Array([1, 2, 3, 4]), 2).toArray(),
        ],
        output: {
          value: [3, 4],
        },
      },
      'works with objects': {
        criteria: 'toEqual',
        input: [drop({ one: 1, two: 2, three: 3, four: 4 }, 2).toArray()],
        output: {
          value: [3, 4],
        },
      },
    });
  });

  describe('sequence.drop', () => {
    execute({
      'defaults to 1 when no drop count is passed': {
        input: new Sequence('unexpected').drop().toArray().join(''),
        output: 'nexpected',
      },
      'throws when drop count is not a number': {
        criteria: 'toThrowError',
        input: [
          () => new Sequence('unexpected').drop('1').toArray().join(''),
          () => new Sequence('unexpected').drop('a').toArray().join(''),
          () => new Sequence('unexpected').drop({ one: 1 }).toArray().join(''),
          () => new Sequence('unexpected').drop([1]).toArray().join(''),
          () => new Sequence('unexpected').drop(Infinity).toArray().join(''),
          () => new Sequence('unexpected').drop(-Infinity).toArray().join(''),
          () => new Sequence('unexpected').drop(NaN).toArray().join(''),
        ],
        output: {
          value: GuardError,
        },
      },
      'returns the same input when using drop count lesser than 1': {
        input: [
          new Sequence('unexpected').drop(-2).toArray().join(''),
          new Sequence('unexpected').drop(-1).toArray().join(''),
          new Sequence('unexpected').drop(0).toArray().join(''),
        ],
        output: 'unexpected',
      },
      'returns the empty when the count is greater than the length of the input': {
        input: [
          new Sequence('unexpected').drop(100).toArray().join(''),
          new Sequence('unexpected').drop(200).toArray().join(''),
          new Sequence('unexpected').drop(300).toArray().join(''),
        ],
        output: '',
      },
      'works with strings': {
        input: new Sequence('unexpected').drop(2).toArray().join(''),
        output: 'expected',
      },
      'works with arrays': {
        criteria: 'toEqual',
        input: [new Sequence([1, 2, 3, 4]).drop(2).toArray()],
        output: {
          value: [3, 4],
        },
      },
      'works with maps': {
        criteria: 'toEqual',
        input: [new Sequence(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])).drop(2).toArray()],
        output: {
          value: [3, 4],
        },
      },
      'works with sets': {
        criteria: 'toEqual',
        input: [new Sequence(new Set([1, 2, 3, 4])).drop(2).toArray()],
        output: {
          value: [3, 4],
        },
      },
      'works with typed arrays': {
        criteria: 'toEqual',
        input: [
          new Sequence(new Float32Array([1, 2, 3, 4])).drop(2).toArray(),
          new Sequence(new Float64Array([1, 2, 3, 4])).drop(2).toArray(),
          new Sequence(new Int8Array([1, 2, 3, 4])).drop(2).toArray(),
          new Sequence(new Int16Array([1, 2, 3, 4])).drop(2).toArray(),
          new Sequence(new Int32Array([1, 2, 3, 4])).drop(2).toArray(),
          new Sequence(new Uint8Array([1, 2, 3, 4])).drop(2).toArray(),
          new Sequence(new Uint8ClampedArray([1, 2, 3, 4])).drop(2).toArray(),
          new Sequence(new Uint16Array([1, 2, 3, 4])).drop(2).toArray(),
          new Sequence(new Uint32Array([1, 2, 3, 4])).drop(2).toArray(),
        ],
        output: {
          value: [3, 4],
        },
      },
      'works with objects': {
        criteria: 'toEqual',
        input: [new Sequence({ one: 1, two: 2, three: 3, four: 4 }).drop(2).toArray()],
        output: {
          value: [3, 4],
        },
      },
    });
  });

  describe('sequence.skip', () => {
    execute({
      'defaults to 1 when no skip count is passed': {
        input: new Sequence('unexpected').skip().toArray().join(''),
        output: 'nexpected',
      },
      'throws when skip count is not a number': {
        criteria: 'toThrowError',
        input: [
          () => new Sequence('unexpected').skip('1').toArray().join(''),
          () => new Sequence('unexpected').skip('a').toArray().join(''),
          () => new Sequence('unexpected').skip({ one: 1 }).toArray().join(''),
          () => new Sequence('unexpected').skip([1]).toArray().join(''),
          () => new Sequence('unexpected').skip(Infinity).toArray().join(''),
          () => new Sequence('unexpected').skip(-Infinity).toArray().join(''),
          () => new Sequence('unexpected').skip(NaN).toArray().join(''),
        ],
        output: {
          value: GuardError,
        },
      },
      'returns the same input when using skip count lesser than 1': {
        input: [
          new Sequence('unexpected').skip(-2).toArray().join(''),
          new Sequence('unexpected').skip(-1).toArray().join(''),
          new Sequence('unexpected').skip(0).toArray().join(''),
        ],
        output: 'unexpected',
      },
      'returns the empty when the count is greater than the length of the input': {
        input: [
          new Sequence('unexpected').skip(100).toArray().join(''),
          new Sequence('unexpected').skip(200).toArray().join(''),
          new Sequence('unexpected').skip(300).toArray().join(''),
        ],
        output: '',
      },
      'works with strings': {
        input: new Sequence('unexpected').skip(2).toArray().join(''),
        output: 'expected',
      },
      'works with arrays': {
        criteria: 'toEqual',
        input: [new Sequence([1, 2, 3, 4]).skip(2).toArray()],
        output: {
          value: [3, 4],
        },
      },
      'works with maps': {
        criteria: 'toEqual',
        input: [new Sequence(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])).skip(2).toArray()],
        output: {
          value: [3, 4],
        },
      },
      'works with sets': {
        criteria: 'toEqual',
        input: [new Sequence(new Set([1, 2, 3, 4])).skip(2).toArray()],
        output: {
          value: [3, 4],
        },
      },
      'works with typed arrays': {
        criteria: 'toEqual',
        input: [
          new Sequence(new Float32Array([1, 2, 3, 4])).skip(2).toArray(),
          new Sequence(new Float64Array([1, 2, 3, 4])).skip(2).toArray(),
          new Sequence(new Int8Array([1, 2, 3, 4])).skip(2).toArray(),
          new Sequence(new Int16Array([1, 2, 3, 4])).skip(2).toArray(),
          new Sequence(new Int32Array([1, 2, 3, 4])).skip(2).toArray(),
          new Sequence(new Uint8Array([1, 2, 3, 4])).skip(2).toArray(),
          new Sequence(new Uint8ClampedArray([1, 2, 3, 4])).skip(2).toArray(),
          new Sequence(new Uint16Array([1, 2, 3, 4])).skip(2).toArray(),
          new Sequence(new Uint32Array([1, 2, 3, 4])).skip(2).toArray(),
        ],
        output: {
          value: [3, 4],
        },
      },
      'works with objects': {
        criteria: 'toEqual',
        input: [new Sequence({ one: 1, two: 2, three: 3, four: 4 }).skip(2).toArray()],
        output: {
          value: [3, 4],
        },
      },
    });
  });

  describe('sequence.tail', () => {
    execute({
      'defaults to 1 when no tail count is passed': {
        input: new Sequence('unexpected').tail().toArray().join(''),
        output: 'nexpected',
      },
      'throws when tail count is not a number': {
        criteria: 'toThrowError',
        input: [
          () => new Sequence('unexpected').tail('1').toArray().join(''),
          () => new Sequence('unexpected').tail('a').toArray().join(''),
          () => new Sequence('unexpected').tail({ one: 1 }).toArray().join(''),
          () => new Sequence('unexpected').tail([1]).toArray().join(''),
          () => new Sequence('unexpected').tail(Infinity).toArray().join(''),
          () => new Sequence('unexpected').tail(-Infinity).toArray().join(''),
          () => new Sequence('unexpected').tail(NaN).toArray().join(''),
        ],
        output: {
          value: GuardError,
        },
      },
      'returns the same input when using tail count lesser than 1': {
        input: [
          new Sequence('unexpected').tail(-2).toArray().join(''),
          new Sequence('unexpected').tail(-1).toArray().join(''),
          new Sequence('unexpected').tail(0).toArray().join(''),
        ],
        output: 'unexpected',
      },
      'returns the empty when the count is greater than the length of the input': {
        input: [
          new Sequence('unexpected').tail(100).toArray().join(''),
          new Sequence('unexpected').tail(200).toArray().join(''),
          new Sequence('unexpected').tail(300).toArray().join(''),
        ],
        output: '',
      },
      'works with strings': {
        input: new Sequence('unexpected').tail(2).toArray().join(''),
        output: 'expected',
      },
      'works with arrays': {
        criteria: 'toEqual',
        input: [new Sequence([1, 2, 3, 4]).tail(2).toArray()],
        output: {
          value: [3, 4],
        },
      },
      'works with maps': {
        criteria: 'toEqual',
        input: [new Sequence(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])).tail(2).toArray()],
        output: {
          value: [3, 4],
        },
      },
      'works with sets': {
        criteria: 'toEqual',
        input: [new Sequence(new Set([1, 2, 3, 4])).tail(2).toArray()],
        output: {
          value: [3, 4],
        },
      },
      'works with typed arrays': {
        criteria: 'toEqual',
        input: [
          new Sequence(new Float32Array([1, 2, 3, 4])).tail(2).toArray(),
          new Sequence(new Float64Array([1, 2, 3, 4])).tail(2).toArray(),
          new Sequence(new Int8Array([1, 2, 3, 4])).tail(2).toArray(),
          new Sequence(new Int16Array([1, 2, 3, 4])).tail(2).toArray(),
          new Sequence(new Int32Array([1, 2, 3, 4])).tail(2).toArray(),
          new Sequence(new Uint8Array([1, 2, 3, 4])).tail(2).toArray(),
          new Sequence(new Uint8ClampedArray([1, 2, 3, 4])).tail(2).toArray(),
          new Sequence(new Uint16Array([1, 2, 3, 4])).tail(2).toArray(),
          new Sequence(new Uint32Array([1, 2, 3, 4])).tail(2).toArray(),
        ],
        output: {
          value: [3, 4],
        },
      },
      'works with objects': {
        criteria: 'toEqual',
        input: [new Sequence({ one: 1, two: 2, three: 3, four: 4 }).tail(2).toArray()],
        output: {
          value: [3, 4],
        },
      },
    });
  });
});
