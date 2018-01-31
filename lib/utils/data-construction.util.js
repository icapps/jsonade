/* eslint-disable no-use-before-define */
const {
  isNil,
  isString,
  isPlainObject,
  isArray,
  isFunction,
  isBoolean,
  isDate,
  isNumber,
  omit,
  some,
  every,
} = require('lodash');

function getTotalCount(data, totalCount) {
  if (isNil(totalCount)) {
    return data.length;
  }
  return totalCount;
}

function constructMeta(data, resource, config = {}) {
  const meta = Object.assign(
    {
      type: resource,
    },
    omit(config, ['type']),
  );

  if (isArray(data)) {
    return Object.assign(
      meta,
      {
        count: data.length,
        totalCount: getTotalCount(data, config.totalCount),
      },
    );
  }

  return meta;
}

function isFlatValue(val) {
  // if the valu eis an atomic array, return this array
  if (isArray(val)) return every(val, isString);

  return some([
    isNumber(val),
    isString(val),
    isBoolean(val),
    isDate(val),
  ], Boolean);
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
  if (isFlatValue(data[key])) {
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

function constructData(data, customConfig = { attributes: [] }) {
  const defaultConfig = {
    attributes: [],
  };
  const config = Object.assign({}, defaultConfig, customConfig);

  // if the dataset is an array
  if (isArray(data)) {
    return data.map(item => constructData(item, config));
  }

  return config.attributes.reduce((obj, key) => {
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
