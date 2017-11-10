const { pick, isPlainObject } = require('lodash');

function constructError(data) {
  const requiredProps = ['title', 'status'];
  const optionalProps = ['id', 'code', 'detail', 'url', 'meta'];

  requiredProps.forEach((prop) => {
    if (!Object.keys(data).includes(prop)) {
      throw new Error(`ErrorSerializer requires property ${prop}`);
    }
  });

  return Object.assign(
    {},
    pick(data, requiredProps),
    pick(data, optionalProps),
  );
}

function constructErrors(data) {
  if (isPlainObject(data)) {
    return [constructError(data)];
  }

  return data.map(constructError);
}

class ErrorSerializer {
  constructor() {
    throw new Error('ErrorSerializer instances are not implemented');
  }

  static serialize(data) {
    return {
      errors: constructErrors(data),
    };
  }
}

module.exports = ErrorSerializer;
