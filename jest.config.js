// jest.config.js
module.exports = {
  verbose: false,
  notify: false,
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json',
  ],
  testRegex: '/tests/.*\\.(ts|tsx|js)$',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/index.ts',
    'src/config',
  ],
};
