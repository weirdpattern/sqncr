function isPrimitive(candidate : any) {
  return candidate == null || (typeof candidate !== 'object' && typeof candidate !== 'function');
}

function process(input, output, criteria) {
  let negated;
  let criterion;
  let expectation;

  const outputs = Array.isArray(output) ? output : [output];
  outputs.forEach((descriptor) => {
    expectation = expect(input);
    criterion = descriptor.criteria || criteria || 'toBe';
    negated = descriptor.negated || false;

    if (typeof descriptor === 'object') {
      if (negated) {
        expectation = expectation.not;
      }
    }

    if (isPrimitive(descriptor)) {
      descriptor = {
        value: descriptor,
      };
    }

    expectation[criterion](
      typeof descriptor === 'function' ? descriptor(input) : descriptor.value,
    );
  });
}

export default function run(tests) {
  Object.keys(tests).forEach((key) => {
    const description = key;
    const descriptor = tests[key];

    it(description, () => {
      const inputs = Array.isArray(descriptor.input) ? descriptor.input : [descriptor.input];
      inputs.forEach((input) => {
        if (descriptor.log) {
          console.log(`input: ${input}`);              // eslint-disable-line no-console
          console.log(`output: ${descriptor.output}`); // eslint-disable-line no-console
        }
        process(input, descriptor.output, descriptor.criteria);
      });
    });
  });
}
