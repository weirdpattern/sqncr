import generate from './utils/data';
import Sequence, {
  counter,
  entries,
  keys,
  range,
  repeat,
  values,
  isSequence,
} from '../lib/modern/sequence';

const api = [
  'all', 'chunk', 'compact', 'consecutive', 'drop', 'dropWhile', 'each', 'every', 'foreach',
  'forEach', 'filter', 'find', 'first', 'flat', 'flatten', 'get', 'items', 'skip', 'skipWhile',
].sort();

describe('sequence', () => {
  describe('basics', () => {
    it('can be iterated using of', () => {
      const array = generate(Array, 10);

      const sequence : Sequence = Sequence.from(array);
      const arraySequence : Array<number> = [];

      for (const item : number of sequence) {
        arraySequence.push(item);
      }

      expect(arraySequence.sort()).toEqual(array.sort());
    });

    it('implements the API', () => {
      const sequence : Sequence = Sequence.from(generate(Array, 10));
      const methods : Array<string> = Object.keys(Object.getPrototypeOf(sequence))
        .filter((method) => method && method !== 'constructor')
        .sort();

      expect(methods).toEqual(api);
      expect(Sequence.from).toBeDefined();
      expect(typeof Sequence.from).toBe('function');
    });
  });

  describe('from', () => {
    it('can generate sequences using from', () => {
      expect(Sequence.from(generate(String, 10))).toBeDefined();
      expect(isSequence(Sequence.from(generate(String, 10)))).toBeTruthy();

      expect(Sequence.from(generate(Array, 10))).toBeDefined();
      expect(isSequence(Sequence.from(generate(Array, 10)))).toBeTruthy();

      expect(Sequence.from(generate(Map, 10))).toBeDefined();
      expect(isSequence(Sequence.from(generate(Map, 10)))).toBeTruthy();

      expect(Sequence.from(generate(Set, 10))).toBeDefined();
      expect(isSequence(Sequence.from(generate(Set, 10)))).toBeTruthy();

      expect(Sequence.from(generate(Float32Array, 10))).toBeDefined();
      expect(isSequence(Sequence.from(generate(Float32Array, 10)))).toBeTruthy();

      expect(Sequence.from(generate(Float64Array, 10))).toBeDefined();
      expect(isSequence(Sequence.from(generate(Float64Array, 10)))).toBeTruthy();

      expect(Sequence.from(generate(Int8Array, 10))).toBeDefined();
      expect(isSequence(Sequence.from(generate(Int8Array, 10)))).toBeTruthy();

      expect(Sequence.from(generate(Int16Array, 10))).toBeDefined();
      expect(isSequence(Sequence.from(generate(Int16Array, 10)))).toBeTruthy();

      expect(Sequence.from(generate(Int32Array, 10))).toBeDefined();
      expect(isSequence(Sequence.from(generate(Int32Array, 10)))).toBeTruthy();

      expect(Sequence.from(generate(Uint8Array, 10))).toBeDefined();
      expect(isSequence(Sequence.from(generate(Uint8Array, 10)))).toBeTruthy();

      expect(Sequence.from(generate(Uint16Array, 10))).toBeDefined();
      expect(isSequence(Sequence.from(generate(Uint16Array, 10)))).toBeTruthy();

      expect(Sequence.from(generate(Uint32Array, 10))).toBeDefined();
      expect(isSequence(Sequence.from(generate(Uint32Array, 10)))).toBeTruthy();
    });

    it('throws an error when a non-iterable object is passed to from', () => {
      expect(() => Sequence.from(true)).toThrow(TypeError, 'Expecting an iterable object');
      expect(() => Sequence.from(1)).toThrow(TypeError, 'Expecting an iterable object');
      expect(() => Sequence.from(Symbol('one'))).toThrow(TypeError, 'Expecting an iterable object');
      expect(() => Sequence.from(new Date())).toThrow(TypeError, 'Expecting an iterable object');
      expect(() => Sequence.from(/a-Z/)).toThrow(TypeError, 'Expecting an iterable object');
      expect(() => Sequence.from({ one: 'one' })).toThrow(
        TypeError, 'Expecting an iterable object'
      );
    });
  });

  function Shape() {}
  Shape.prototype.x = 0;
  Shape.prototype.y = 0;

  function Rectangle() {
    Shape.call(this);
    this.sides = 4;
  }

  Rectangle.prototype = Object.create(Shape.prototype);
  Rectangle.prototype.constructor = Rectangle;

  const object = new Rectangle();

  const descriptions = {
    counter: [
      {
        title: 'can generate sequences using counter with defaults',
        sample: 10,
        iterator: counter(),
        expected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      {
        title: 'can generate sequences using Sequence.counter with defaults',
        sample: 10,
        iterator: Sequence.counter(),
        expected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      {
        title: 'can generate sequences using counter with start = 4',
        sample: 10,
        iterator: counter(4),
        expected: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        title: 'can generate sequences using Sequence.counter with start = 4',
        sample: 10,
        iterator: Sequence.counter(4),
        expected: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      {
        title: 'can generate sequences using counter with start = 0 and step = 10',
        sample: 10,
        iterator: counter(0, 10),
        expected: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
      },
      {
        title: 'can generate sequences using Sequence.counter with start = 0 and step = 10',
        sample: 10,
        iterator: Sequence.counter(0, 10),
        expected: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
      },
      {
        title: 'can generate sequences using counter with start = 0 and step = -1',
        sample: 10,
        iterator: counter(0, -1),
        expected: [0, -1, -2, -3, -4, -5, -6, -7, -8, -9],
      },
      {
        title: 'can generate sequences using Sequence.counter with start = 0 and step = -1',
        sample: 10,
        iterator: Sequence.counter(0, -1),
        expected: [0, -1, -2, -3, -4, -5, -6, -7, -8, -9],
      },
      {
        title: 'can generate sequences using counter with start = -5 and step = -5',
        sample: 10,
        iterator: counter(-5, -5),
        expected: [-5, -10, -15, -20, -25, -30, -35, -40, -45, -50],
      },
      {
        title: 'can generate sequences using Sequence.counter with start = -5 and step = -5',
        sample: 10,
        iterator: Sequence.counter(-5, -5),
        expected: [-5, -10, -15, -20, -25, -30, -35, -40, -45, -50],
      },
      {
        title: 'throws an exception when start is not numeric when calling counter',
        sample: 10,
        iterator: counter('a'),
        throws: { type: TypeError, message: 'Expecting an error' },
      },
      {
        title: 'throws an exception when start is not numeric when calling Sequence.counter',
        sample: 10,
        iterator: Sequence.counter('a'),
        throws: { type: TypeError, message: 'Expecting an error' },
      },
      {
        title: 'throws an exception when step is not numeric when calling counter',
        sample: 10,
        iterator: counter(0, 'a'),
        throws: { type: TypeError, message: 'Expecting an error' },
      },
      {
        title: 'throws an exception when step is not numeric when calling Sequence.counter',
        sample: 10,
        iterator: Sequence.counter(0, 'a'),
        throws: { type: TypeError, message: 'Expecting an error' },
      },
    ],
    entries: [
      {
        title: 'can generate sequences using entries with defaults',
        iterator: entries(object),
        expected: [['sides', 4]],
      },
      {
        title: 'can generate sequences using Sequence.entries with defaults',
        iterator: Sequence.entries(object),
        expected: [['sides', 4]],
      },
      {
        title: 'can generate sequences using entries with only owned',
        iterator: entries(object, true),
        expected: [['sides', 4]],
      },
      {
        title: 'can generate sequences using Sequence.entries only owned',
        iterator: Sequence.entries(object, true),
        expected: [['sides', 4]],
      },
      {
        title: 'can generate sequences using entries with all properties',
        iterator: entries(object, false),
        expected: [['sides', 4], ['constructor', Rectangle], ['x', 0], ['y', 0]],
      },
      {
        title: 'can generate sequences using Sequence.entries all properties',
        iterator: Sequence.entries(object, false),
        expected: [['sides', 4], ['constructor', Rectangle], ['x', 0], ['y', 0]],
      },
      {
        title: 'can generate sequences using entries with arrays',
        iterator: entries(generate(Array, 10), false),
        expected: [
          ['0', 1], ['1', 2], ['2', 3], ['3', 4], ['4', 5],
          ['5', 6], ['6', 7], ['7', 8], ['8', 9], ['9', 10],
        ],
      },
      {
        title: 'can generate sequences using Sequence.entries with arrays',
        iterator: Sequence.entries(generate(Array, 10), false),
        expected: [
          ['0', 1], ['1', 2], ['2', 3], ['3', 4], ['4', 5],
          ['5', 6], ['6', 7], ['7', 8], ['8', 9], ['9', 10],
        ],
      },
      {
        title: 'can generate sequences using entries with strings',
        iterator: entries('test', false),
        expected: [['0', 't'], ['1', 'e'], ['2', 's'], ['3', 't']],
      },
      {
        title: 'can generate sequences using Sequence.entries with strings',
        iterator: Sequence.entries('test', false),
        expected: [['0', 't'], ['1', 'e'], ['2', 's'], ['3', 't']],
      },
      {
        title: 'returns empty when calling entries with numbers',
        iterator: entries(1, false),
        expected: [],
      },
      {
        title: 'returns empty when calling Sequence.entries with numbers',
        iterator: Sequence.entries(1, false),
        expected: [],
      },
      {
        title: 'throws an exception when calling entries with null',
        iterator: entries(null, false),
        throws: { type: TypeError, message: 'Expecting a valid object' },
      },
      {
        title: 'throws an exception when calling Sequence.entries with null',
        iterator: Sequence.entries(null, false),
        throws: { type: TypeError, message: 'Expecting a valid object' },
      },
      {
        title: 'throws an exception when calling entries with undefined',
        iterator: entries(undefined, false),
        throws: { type: TypeError, message: 'Expecting a valid object' },
      },
      {
        title: 'throws an exception when calling Sequence.entries with undefined',
        iterator: Sequence.entries(undefined, false),
        throws: { type: TypeError, message: 'Expecting a valid object' },
      },
    ],
    keys: [
      {
        title: 'can generate sequences using keys with defaults',
        iterator: keys(object),
        expected: ['sides'],
      },
      {
        title: 'can generate sequences using Sequence.keys with defaults',
        iterator: Sequence.keys(object),
        expected: ['sides'],
      },
      {
        title: 'can generate sequences using keys with only owned',
        iterator: keys(object, true),
        expected: ['sides'],
      },
      {
        title: 'can generate sequences using Sequence.keys only owned',
        iterator: Sequence.keys(object, true),
        expected: ['sides'],
      },
      {
        title: 'can generate sequences using keys with all properties',
        iterator: keys(object, false),
        expected: ['sides', 'constructor', 'x', 'y'],
      },
      {
        title: 'can generate sequences using Sequence.keys all properties',
        iterator: Sequence.keys(object, false),
        expected: ['sides', 'constructor', 'x', 'y'],
      },
      {
        title: 'can generate sequences using keys with arrays',
        iterator: keys(generate(Array, 10), false),
        expected: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      },
      {
        title: 'can generate sequences using Sequence.keys with arrays',
        iterator: Sequence.keys(generate(Array, 10), false),
        expected: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      },
      {
        title: 'can generate sequences using keys with strings',
        iterator: keys('test', false),
        expected: ['0', '1', '2', '3'],
      },
      {
        title: 'can generate sequences using Sequence.keys with strings',
        iterator: Sequence.keys('test', false),
        expected: ['0', '1', '2', '3'],
      },
      {
        title: 'returns empty when calling keys with numbers',
        iterator: keys(1, false),
        expected: [],
      },
      {
        title: 'returns empty when calling Sequence.keys with numbers',
        iterator: Sequence.keys(1, false),
        expected: [],
      },
      {
        title: 'throws an exception when calling keys with null',
        iterator: keys(null, false),
        throws: { type: TypeError, message: 'Expecting a valid object' },
      },
      {
        title: 'throws an exception when calling Sequence.keys with null',
        iterator: Sequence.keys(null, false),
        throws: { type: TypeError, message: 'Expecting a valid object' },
      },
      {
        title: 'throws an exception when calling keys with undefined',
        iterator: keys(undefined, false),
        throws: { type: TypeError, message: 'Expecting a valid object' },
      },
      {
        title: 'throws an exception when calling Sequence.keys with undefined',
        iterator: Sequence.keys(undefined, false),
        throws: { type: TypeError, message: 'Expecting a valid object' },
      },
    ],
    range: [
      {
        title: 'can generate sequences using range with defaults',
        iterator: range(),
        expected: [],
      },
      {
        title: 'can generate sequences using Sequence.range with defaults',
        iterator: Sequence.range(),
        expected: [],
      },
      {
        title: 'can generate sequences using range with start = 4 (as end)',
        iterator: range(4),
        expected: [0, 1, 2, 3],
      },
      {
        title: 'can generate sequences using Sequence.range with start = 4 (as end)',
        iterator: Sequence.range(4),
        expected: [0, 1, 2, 3],
      },
      {
        title: 'can generate sequences using range with start = 4 and stop = 8',
        iterator: range(4, 8),
        expected: [4, 5, 6, 7],
      },
      {
        title: 'can generate sequences using Sequence.range with start = 4 and stop = 8',
        iterator: Sequence.range(4, 8),
        expected: [4, 5, 6, 7],
      },
      {
        title: 'can generate sequences using range with start = 4, stop = 8 and step = 2',
        iterator: range(4, 8, 2),
        expected: [4, 6],
      },
      {
        title: 'can generate sequences using Sequence.range with start = 4, stop = 8 and step = 2',
        iterator: Sequence.range(4, 8, 2),
        expected: [4, 6],
      },
      {
        title: 'can generate sequences using range with start = 0, stop = -8, step = -2',
        iterator: range(0, -8, -2),
        expected: [0, -2, -4, -6],
      },
      {
        title: 'can generate sequences using Sequence.range with start = 0, stop = -8, step = -2',
        iterator: Sequence.range(0, -8, -2),
        expected: [0, -2, -4, -6],
      },
      {
        title: 'returns empty with invalid ranges when calling range',
        iterator: range(0, 8, -2),
        expected: [],
      },
      {
        title: 'returns empty with invalid ranges when calling Sequence.range',
        iterator: Sequence.range(0, 8, -2),
        expected: [],
      },
      {
        title: 'throws an exception when start is not numeric when calling range',
        iterator: range('a', 8, 2),
        throws: { type: TypeError, message: 'Expecting an error' },
      },
      {
        title: 'throws an exception when start is not numeric when calling Sequence.range',
        iterator: Sequence.range('a', 8, 2),
        throws: { type: TypeError, message: 'Expecting an error' },
      },
      {
        title: 'throws an exception when stop is not numeric when calling range',
        iterator: range(0, 'a', 2),
        throws: { type: TypeError, message: 'Expecting an error' },
      },
      {
        title: 'throws an exception when stop is not numeric when calling Sequence.range',
        iterator: Sequence.range(0, 'a', 2),
        throws: { type: TypeError, message: 'Expecting an error' },
      },
      {
        title: 'throws an exception when step is not numeric when calling range',
        iterator: range(0, 2, 'a'),
        throws: { type: TypeError, message: 'Expecting an error' },
      },
      {
        title: 'throws an exception when step is not numeric when calling Sequence.range',
        iterator: range(0, 2, 'a'),
        throws: { type: TypeError, message: 'Expecting an error' },
      },
    ],
    repeat: [
      {
        title: 'can generate sequences using repeat with defaults',
        sample: 10,
        iterator: repeat('a'),
        expected: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      },
      {
        title: 'can generate sequences using Sequence.repeat with defaults',
        sample: 10,
        iterator: Sequence.repeat('a'),
        expected: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      },
      {
        title: 'can generate sequences using repeat with times = 5',
        iterator: repeat('a', 5),
        expected: ['a', 'a', 'a', 'a', 'a'],
      },
      {
        title: 'can generate sequences using Sequence.repeat with times = 5',
        iterator: Sequence.repeat('a', 5),
        expected: ['a', 'a', 'a', 'a', 'a'],
      },
      {
        title: 'returns empty using repeat with negative number of times',
        iterator: repeat('a', -1),
        expected: [],
      },
      {
        title: 'returns empty using Sequence.repeat with negative number of times',
        iterator: Sequence.repeat('a', -1),
        expected: [],
      },
      {
        title: 'throws an exception when times is not numeric when calling repeat',
        iterator: repeat('a', 'a'),
        expected: [],
      },
      {
        title: 'throws an exception when times is not numeric when calling Sequence.repeat',
        iterator: Sequence.repeat('a', 'a'),
        expected: [],
      },
    ],
    values: [
      {
        title: 'can generate sequences using values with defaults',
        iterator: values(object),
        expected: [4],
      },
      {
        title: 'can generate sequences using Sequence.values with defaults',
        iterator: Sequence.values(object),
        expected: [4],
      },
      {
        title: 'can generate sequences using values with only owned',
        iterator: values(object, true),
        expected: [4],
      },
      {
        title: 'can generate sequences using Sequence.values only owned',
        iterator: Sequence.values(object, true),
        expected: [4],
      },
      {
        title: 'can generate sequences using values with all properties',
        iterator: values(object, false),
        expected: [4, Rectangle, 0, 0],
      },
      {
        title: 'can generate sequences using Sequence.values all properties',
        iterator: Sequence.values(object, false),
        expected: [4, Rectangle, 0, 0],
      },
      {
        title: 'can generate sequences using entries with arrays',
        iterator: values(generate(Array, 10), false),
        expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      {
        title: 'can generate sequences using Sequence.values with arrays',
        iterator: Sequence.values(generate(Array, 10), false),
        expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      {
        title: 'can generate sequences using values with strings',
        iterator: values('test', false),
        expected: ['t', 'e', 's', 't'],
      },
      {
        title: 'can generate sequences using Sequence.values with strings',
        iterator: Sequence.values('test', false),
        expected: ['t', 'e', 's', 't'],
      },
      {
        title: 'returns empty when calling values with numbers',
        iterator: values(1, false),
        expected: [],
      },
      {
        title: 'returns empty when calling Sequence.values with numbers',
        iterator: Sequence.values(1, false),
        expected: [],
      },
      {
        title: 'throws an exception when calling values with null',
        iterator: values(null, false),
        throws: { type: TypeError, message: 'Expecting a valid object' },
      },
      {
        title: 'throws an exception when calling Sequence.values with null',
        iterator: Sequence.values(null, false),
        throws: { type: TypeError, message: 'Expecting a valid object' },
      },
      {
        title: 'throws an exception when calling values with undefined',
        iterator: values(undefined, false),
        throws: { type: TypeError, message: 'Expecting a valid object' },
      },
      {
        title: 'throws an exception when calling Sequence.values with undefined',
        iterator: Sequence.values(undefined, false),
        throws: { type: TypeError, message: 'Expecting a valid object' },
      },
    ],
  };

  const expectation = (provided, expected) => () => {
    if (expected && expected.type && expected.message) {
      expect(provided).toThrow(expected.type, expected.message);
    } else {
      expect(provided).toEqual(expected);
    }
  };

  Object.keys(descriptions).forEach((description) => {
    describe(description, () => {
      const scenarios = descriptions[description];
      for (const scenario of scenarios) {
        const execution = () => {
          const results = [];

          scenario.sample = scenario.sample || 'all';
          if (scenario.sample === 'all') {
            let current = scenario.iterator.next();

            while (!current.done) {
              results.push(current.value);
              current = scenario.iterator.next();
            }
          } else {
            for (let index = 0; index < scenario.sample; index++) {
              results.push(scenario.iterator.next().value);
            }
          }

          return results;
        };

        it(scenario.title, expectation(scenario.throws ? execution : execution(),
                                       scenario.expected || scenario.throws));
      }
    });
  });
});
