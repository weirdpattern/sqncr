import Sequence from '../../../lib/sequence';
import { GuardError } from '../../../lib/utils/guard';

function increase(additional) {
  return (reduced, value, key) => {
    reduced[+key + additional] = value + 1;
    return reduced;
  };
}

export default {
  'throws when an aggregator function is not provided': {
    criteria: 'toThrowError',
    input: () => new Sequence('unexpected').reduce().toArray().join(''),
    output: {
      value: GuardError,
    },
  },

  'works without an input value with string sources': {
    input: new Sequence('unexpected').reduce((reduced, value) => {
      reduced += value === 'e' ? 'a' : value;
      return reduced;
    }),
    output: {
      value: 'unaxpactad',
    },
  },

  'works without an input value with array sources': {
    criteria: 'toEqual',
    input: [new Sequence([1, 2, 3, 4]).reduce((reduced, value) => {
      reduced.push(value + 1);
      return reduced;
    })],
    output: {
      value: [2, 3, 4, 5],
    },
  },

  'works without an input value with map sources': {
    criteria: 'toEqual',
    input: [
      Array.from(
        new Sequence(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])).reduce(
          (reduced, value, key) => {
            reduced.set(key, value + 1);
            return reduced;
          }
        ).values()
      ),
    ],
    output: {
      value: [2, 3, 4, 5],
    },
  },

  'works without an input value with set sources': {
    criteria: 'toEqual',
    input: [
      Array.from(
        new Sequence(new Set([1, 2, 3, 4])).reduce((reduced, value) => {
          reduced.add(value + 1);
          return reduced;
        }).values()
      ),
    ],
    output: {
      value: [2, 3, 4, 5],
    },
  },

  'works without an input value with typed array sources': {
    criteria: 'toEqual',
    input: [
      Array.from(
        new Sequence(new Float32Array([1, 2, 3, 4])).reduce(increase(0)).values()
      ),
      Array.from(
        new Sequence(new Float64Array([1, 2, 3, 4])).reduce(increase(0)).values()
      ),
      Array.from(
        new Sequence(new Int8Array([1, 2, 3, 4])).reduce(increase(0)).values()
      ),
      Array.from(
        new Sequence(new Int16Array([1, 2, 3, 4])).reduce(increase(0)).values()
      ),
      Array.from(
        new Sequence(new Int32Array([1, 2, 3, 4])).reduce(increase(0)).values()
      ),
      Array.from(
        new Sequence(new Uint8Array([1, 2, 3, 4])).reduce(increase(0)).values()
      ),
      Array.from(
        new Sequence(new Uint8ClampedArray([1, 2, 3, 4])).reduce(increase(0)).values()
      ),
      Array.from(
        new Sequence(new Uint16Array([1, 2, 3, 4])).reduce(increase(0)).values()
      ),
      Array.from(
        new Sequence(new Uint32Array([1, 2, 3, 4])).reduce(increase(0)).values()
      ),
    ],
    output: {
      value: [2, 3, 4, 5],
    },
  },

  'works without an input value with object sources': {
    criteria: 'toEqual',
    input: new Sequence({ one: 1, two: 2, three: 3, four: 4 }).reduce(
      (reduced, value, key) => {
        reduced[key] = value + 1;
        return reduced;
      }
    ),
    output: {
      value: { one: 2, two: 3, three: 4, four: 5 },
    },
  },

  'works with an input value with string sources': {
    input: new Sequence('unexpected').reduce((reduced, value) => {
      reduced += value === 'e' ? 'a' : value;
      return reduced;
    }, 'the '),
    output: {
      value: 'the unaxpactad',
    },
  },

  'works with an input value with array sources': {
    criteria: 'toEqual',
    input: [new Sequence([1, 2, 3, 4]).reduce((reduced, value) => {
      reduced.push(value + 1);
      return reduced;
    }, [0])],
    output: {
      value: [0, 2, 3, 4, 5],
    },
  },

  'works with an input value with map sources': {
    criteria: 'toEqual',
    input: [
      Array.from(
        new Sequence(new Map([[1, 1], [2, 2], [3, 3], [4, 4]])).reduce(
          (reduced, value, key) => {
            reduced.set(key, value + 1);
            return reduced;
          }, new Map([[0, 0]])
        ).values()
      ),
    ],
    output: {
      value: [0, 2, 3, 4, 5],
    },
  },

  'works with an input value with set sources': {
    criteria: 'toEqual',
    input: [
      Array.from(
        new Sequence(new Set([1, 2, 3, 4])).reduce((reduced, value) => {
          reduced.add(value + 1);
          return reduced;
        }, new Set([0])).values()
      ),
    ],
    output: {
      value: [0, 2, 3, 4, 5],
    },
  },

  'works with an input value with typed array sources': {
    criteria: 'toEqual',
    input: [
      Array.from(
        new Sequence(
          new Float32Array([1, 2, 3, 4])
        ).reduce(increase(1), new Float32Array(5)).values()
      ),
      Array.from(
        new Sequence(
          new Float64Array([1, 2, 3, 4])
        ).reduce(increase(1), new Float64Array(5)).values()
      ),
      Array.from(
        new Sequence(
          new Int8Array([1, 2, 3, 4])
        ).reduce(increase(1), new Int8Array(5)).values()
      ),
      Array.from(
        new Sequence(
          new Int16Array([1, 2, 3, 4])
        ).reduce(increase(1), new Int16Array(5)).values()
      ),
      Array.from(
        new Sequence(
          new Int32Array([1, 2, 3, 4])
        ).reduce(increase(1), new Int32Array(5)).values()
      ),
      Array.from(
        new Sequence(
          new Uint8Array([1, 2, 3, 4])
        ).reduce(increase(1), new Uint8Array(5)).values()
      ),
      Array.from(
        new Sequence(
          new Uint8ClampedArray([1, 2, 3, 4])
        ).reduce(increase(1), new Uint8ClampedArray(5)).values()
      ),
      Array.from(
        new Sequence(
          new Uint16Array([1, 2, 3, 4])
        ).reduce(increase(1), new Uint16Array(5)).values()
      ),
      Array.from(
        new Sequence(
          new Uint32Array([1, 2, 3, 4])
        ).reduce(increase(1), new Uint32Array(5)).values()
      ),
    ],
    output: {
      value: [0, 2, 3, 4, 5],
    },
  },

  'works with an input value with object sources': {
    criteria: 'toEqual',
    input: new Sequence({ one: 1, two: 2, three: 3, four: 4 }).reduce(
      (reduced, value, key) => {
        reduced[key] = value + 1;
        return reduced;
      }, { zero: 0 }
    ),
    output: {
      value: { zero: 0, one: 2, two: 3, three: 4, four: 5 },
    },
  },

  'works with an input value different from the object source': {
    criteria: 'toEqual',
    input: [
      new Sequence({ one: 1, two: 2, three: 3, four: 4 }).reduce((reduced, value) => {
        reduced.push(value + 1);
        return reduced;
      }, [0]),
    ],
    output: {
      value: [0, 2, 3, 4, 5],
    },
  },
};
