const { pick, isNil, isPlainObject } = require('lodash');
const { constructMeta, constructData } = require('./utils/data-construction.util');
const errors = require('./errors');

function constructError(data) {
  const requiredProps = ['title', 'status'];
  const optionalProps = ['id', 'code', 'detail', 'meta'];

  requiredProps.forEach((prop) => {
    if (!Object.keys(data).includes(prop)) {
      throw new Error(`ErrorSerializer requires property ${prop}`);
    }
  })

  return Object.assign({},
    pick(data, requiredProps),
    pick(data, optionalProps),
  )
}

function constructErrors (data) {
  if (isPlainObject(data)){
    return [ constructError(data) ];
  }

  return data.map(constructError);
}

class ErrorSerializer {
  constructor(error) {
    throw new Error('ErrorSerializer instances are not implemented');
  }

  static serialize(data, dataSetConfig) {
    return {
      errors: constructErrors(data),
    };
  }
}

module.exports = ErrorSerializer;
