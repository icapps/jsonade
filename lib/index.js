const { isNil, pick } = require('lodash');

const defaultConfig = {
  attributes: [],
};

function constructMeta(data, resource) {
  return {
    type: resource,
  };
}

function constructData(data, config) {
  return pick(data, config.attributes);
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
