const { isString, isPlainObject, isArray, isNil, pick } = require('lodash');

const defaultConfig = {
  attributes: [],
};

function constructMeta(data, resource) {
  return {
    type: resource,
  };
}

function getValue(data, key, config) {
  // if value is a string
  if (isString(data[key])) {
    return data[key];
  }

  // if value is an object
  if (isPlainObject(data[key])) {
    return constructData(data[key], config[key]);
  }

  // if value is an array
  if (isArray(data[key])) {
    return data[key].map((val) => {
      return constructData(val, config[key]);
    })
  }
}

function constructData(data, config) {
  const attrs = pick(data, config.attributes);
  const keys = Object.keys(attrs);

  return keys.reduce((obj, key) => {
    const value = getValue(data, key, config);

    return Object.assign({}, obj, {
      [ key ]: value,
    });
  }, {});
}

class Serializer {
  constructor(resource, config) {
    // guards
    if (!resource || isNil(resource)) {
      throw new Error('Resource must be defined');
    }

    this.resource = resource;
    this.config = Object.assign({}, defaultConfig, config);
  }

  serialize(data) {
    return {
      meta: constructMeta(data, this.resource),
      data: constructData(data, this.config),
    };
  }
}

module.exports = { Serializer };
