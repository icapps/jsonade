/* eslint-disable no-use-before-define */
const {
  isNil, isString, isPlainObject, isArray, isFunction,
  pick,
} = require('lodash');
const errors = require('./../errors');

function constructMeta(data, resource, config = {}) {
  if (isArray(data)) {
    // guards
    if (isNil(config.totalCount)) {
      throw new errors.TotalCountOptionError();
    }

    return {
      type: resource,
      count: data.length,
      totalCount: config.totalCount,
    };
  }

  return {
    type: resource,
  };
}

function getValue(data, key, config) {
  if (config[key]) {
    if (config[key] instanceof require('./../serializer')) { // eslint-disable-line global-require
      return constructData(data[key], config[key].config);
    }
  }

  // if value has a callback function config
  if (isFunction(config[key])) {
    return config[key].apply(data, [data[key]]);
  }

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
    return data[key].map(val => constructData(val, config[key]));
  }

  return null;
}

function constructData(data, config) {
  // if the dataset is an array
  if (isArray(data)) {
    return data.map(obj => constructData(obj, config));
  }

  // handle data as an object
  const attrs = pick(data, config.attributes);
  const keys = Object.keys(attrs);

  return keys.reduce((obj, key) => {
    const value = getValue(data, key, config);

    return Object.assign({}, obj, {
      [key]: value,
    });
  }, {});
}

module.exports = {
  constructMeta,
  constructData,
};
