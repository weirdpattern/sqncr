import run from '../../runner';
import reverse from '../../../lib/api/reverse';

describe('standalone/drop', () => {
  run({
    'works with strings': {
      input: reverse('unexpected').toArray().join(''),
      output: 'detcepxenu',
    },
    'works with arrays': {
      criteria: 'toEqual',
      input: [reverse([1, 2, 3, 4]).toArray()],
      output: {
        value: [4, 3, 2, 1],
      },
    },
    'works with maps': {
      criteria: 'toEqual',
      input: [reverse(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])).toArray()],
      output: {
        value: [4, 3, 2, 1],
      },
    },
    'works with sets': {
      criteria: 'toEqual',
      input: [reverse(new Set([1, 2, 3, 4])).toArray()],
      output: {
        value: [4, 3, 2, 1],
      },
    },
    'works with typed arrays': {
      criteria: 'toEqual',
      input: [
        reverse(new Float32Array([1, 2, 3, 4])).toArray(),
        reverse(new Float64Array([1, 2, 3, 4])).toArray(),
        reverse(new Int8Array([1, 2, 3, 4])).toArray(),
        reverse(new Int16Array([1, 2, 3, 4])).toArray(),
        reverse(new Int32Array([1, 2, 3, 4])).toArray(),
        reverse(new Uint8Array([1, 2, 3, 4])).toArray(),
        reverse(new Uint8ClampedArray([1, 2, 3, 4])).toArray(),
        reverse(new Uint16Array([1, 2, 3, 4])).toArray(),
        reverse(new Uint32Array([1, 2, 3, 4])).toArray(),
      ],
      output: {
        value: [4, 3, 2, 1],
      },
    },
    'works with objects': {
      criteria: 'toEqual',
      input: [reverse({ one: 1, two: 2, three: 3, four: 4 }).toArray()],
      output: {
        value: [4, 3, 2, 1],
      },
    },
  });
});
