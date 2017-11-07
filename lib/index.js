const { isNil, pick } = require('lodash');

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
      meta: {
        type: this.resource,
      },
      data: pick(data, this.config.attributes),
    };
  }
}

module.exports = { Serializer };
