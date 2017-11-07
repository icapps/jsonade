const { pick } = require('lodash');

class Serializer {
  constructor(resource, config) {
    this.resource = resource;
    this.config = config;
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
