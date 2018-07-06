const { isNil, omit, isArray } = require('lodash');

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


module.exports = constructMeta;
