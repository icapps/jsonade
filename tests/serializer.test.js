const { Serializer } = require('./../lib');

describe('Serializer', () => {
  test('should serialze a flat dataset', () => {
    // raw data
    const rawData = {
      firstName: 'John',
      lastName: 'Doe',
      age: 27,
    };

    // serializer definition
    const userSerializer = new Serializer('user', {
      attributes: ['firstName', 'lastName']
    });

    const result = userSerializer.serialize(rawData);

    const { meta, data } = result;

    expect(meta.type).toEqual('user');

    expect(data).toEqual({
      firstName: 'John',
      lastName: 'Doe',
    });
  })
});