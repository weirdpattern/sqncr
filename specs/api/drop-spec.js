import execute from '../base';
import drop from '../../lib/api/drop';

describe('api', () => {
  describe('drop', () => {
    describe('standalone', () => {
      execute({
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
      });
    });
  });
});
