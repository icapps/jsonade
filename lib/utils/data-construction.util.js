const convertKey = require('./key-conversion.util');
/* eslint-disable no-use-before-define */
const {
  isString,
  isPlainObject,
  isArray,
  isFunction,
  isBoolean,
  isDate,
  isNumber,
  some,
  every,
} = require('lodash');

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

function getValue(data, key, config, options) {
  if (config[key]) {
    if (config[key] instanceof require('./../serializer')) { // eslint-disable-line global-require
      return constructData(data[key], config[key].config, options);
    }
  }

  // if value has a callback function config
  if (isFunction(config[key])) {
    return config[key].apply(data, [data[key], data]);
  }

  // if value is a string
  if (isFlatValue(data[key])) {
    return data[key];
  }

  // if value is an object
  if (isPlainObject(data[key])) {
    if (config[key]) return constructData(data[key], config[key]);
    return data[key]; // if no corresponding config is found, return plain object
  }

  // if value is an array
  if (isArray(data[key])) {
    return data[key].map(val => constructData(val, config[key]));
  }

  // If value is a mongoDB ID
  if (new RegExp('^[0-9a-fA-F]{24}$').test(data[key])) {
    return data[key];
  }

  return null;
}

function constructData(data, customConfig = { attributes: [] }, options = {}) {
  const defaultConfig = {
    attributes: [],
  };
  const config = Object.assign({}, defaultConfig, customConfig);

  // if the dataset is an array
  if (isArray(data)) {
    return data.map(item => constructData(item, config, options));
  }

  return config.attributes.reduce((obj, key) => {
    const value = getValue(data, key, config, options);
    const formattedKey = convertKey(key, options.case);
    return Object.assign({}, obj, {
      [formattedKey]: value,
    });
  }, {});
}

module.exports = constructData;
