const { Serializer } = require('./../lib');

describe('Serializer multiple resource', () => {
  test('should throw an exception when no resource is given', () => {
    expect(() => {
      new Serializer(null, { // eslint-disable-line no-new
        attributes: ['firstName', 'lastName'],
      });
    }).toThrow('Resource must be defined');
  });
});
