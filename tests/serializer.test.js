const { Serializer } = require('./../lib');

describe('Serializer multiple resource', () => {
  test('should throw an exception when no resource is given', () => {
    expect(() => {
      new Serializer(null, { // eslint-disable-line no-new
        attributes: ['firstName', 'lastName'],
      });
    }).toThrow('Resource must be defined');
  });

  test('should throw an exception when no totalCount is given for an array', () => {
    expect(() => {
      const userSerializer = new Serializer('user', {
        attributes: ['firstName', 'lastName'],
      });

      return userSerializer.serialize([]);
    }).toThrow('Option totalCount must be defined when serializing an array');
  });
});
