const { isNil } = require('lodash');
const { constructMeta, constructData } = require('./utils/data-construction.util');

const defaultConfig = {
  attributes: [],
};

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

module.exports = Serializer;
