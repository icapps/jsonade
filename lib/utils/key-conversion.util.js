const { snakeCase, camelCase, kebabCase } = require('lodash');

function convertCase(string, format) {
  if (format === 'camelCase') return camelCase(string);
  if (format === 'snake_case') return snakeCase(string);
  if (format === 'kebab-case') return kebabCase(string);
  return (string);
}

module.exports = convertCase;
