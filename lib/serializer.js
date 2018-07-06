const { isNil } = require('lodash');
const constructData = require('./utils/data-construction.util');
const constructMeta = require('./utils/meta-construction.util');
const errors = require('./errors');

const defaultConfig = {
  attributes: [],
};

class Serializer {
  constructor(resource, config, options) {
    // guards
    if (!resource || isNil(resource)) {
      throw new errors.UndefinedResourceError();
    }
    this.resource = resource;
    this.options = options;
    this.config = Object.assign({}, defaultConfig, config);
  }

  serialize(data, dataSetConfig) {
    return {
      meta: constructMeta(data, this.resource, dataSetConfig),
      data: constructData(data, this.config, this.options),
    };
  }
}

module.exports = Serializer;
