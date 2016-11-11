const glob = require('glob');
const path = require('path');

const hasOwnProperty = Function.prototype.bind.call(Object.prototype.hasOwnProperty);

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
      typeof descriptor === 'function' ? descriptor(input) : descriptor.value
    );
  });
}

function execute(tests) {
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

glob('specs/**/*.js', { realpath: true, ignore: 'specs/runner.js' }, (err, files) => {
  if (err != null) {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  }

  if (files != null) {
    files.forEach((filename) => {
      const resolvedPath = path.join(
        path.relative(__dirname, path.dirname(filename)),
        path.basename(filename, '.js')
      ).replace(/\\/g, '/');

      let tests = require(`./${resolvedPath}`); // eslint-disable-line
      if (tests && hasOwnProperty(tests, 'default')) {
        tests = tests.default;
      }

      describe(resolvedPath, () => {
        execute(tests);
      });
    });
  }
});
