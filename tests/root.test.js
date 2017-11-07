const root = require('./../lib');

describe('Root module', () => {
  test('should expose a Serialize class', () => {
    expect(true).toBe(true);
    expect(root).toHaveProperty('Serializer');
  })
})
