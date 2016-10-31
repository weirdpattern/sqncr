function isIterable(candidate : any) : boolean {
  return typeof Symbol === 'function' &&
         typeof Symbol.iterator === 'symbol' &&
         typeof candidate[Symbol.iterator] === 'function';
}

function getEmptyIterator() : Iterator {
  return {
    next: () => ({ done: true }),
  };
}

function getIndexBasedIterator(source : Array | String) : Iterator {
  let index = -1;

  return {
    // eslint-disable-next-line arrow-body-style
    next: () => {
      return ++index < source.length
        ? { value: source[index], key: index, done: false }
        : { done: false };
    },
  };
}

function getKeyBasedIterator(source : Object) : Iterator {
  let index = -1;
  const keys = [].concat(
    Object.getOwnPropertyNames(source),
    typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(source) : []
  );

  return {
    // eslint-disable-next-line arrow-body-style
    next: () => {
      return ++index < keys.length
        ? { value: source[keys[index]], key: keys[index], done: false }
        : { done: false };
    },
  };
}

export default function getIterator(source : IterableObject) : Iterator {
  if (source != null) {
    if (isIterable(source)) {
      return source[Symbol.iterator]();
    } else if (Array.isArray(source) || typeof source === 'string') {
      return getIndexBasedIterator(source);
    } else if (typeof source === 'object') {
      return getKeyBasedIterator(source);
    }
  }

  return getEmptyIterator();
}
