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
  });

  test('should serialze a nested object', () => {
    // raw data
    const rawData = {
      firstName: 'John',
      lastName: 'Doe',
      age: 27,
      address: {
        street: 'Markt',
        number: '100',
        city: 'Zonnedorp',
        country: 'Belgium',
      },
    };

    // serializer definition
    const userSerializer = new Serializer('user', {
      attributes: ['firstName', 'lastName', 'address'],
      address: {
        attributes: ['street', 'number'],
      },
    });

    const result = userSerializer.serialize(rawData);
    const { meta, data } = result;

    expect(meta.type).toEqual('user');
    expect(data).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      address: {
        street: 'Markt',
        number: '100',
      }
    });
  });

  test('should serialze a nested array', () => {
    // raw data
    const rawData = {
      firstName: 'John',
      lastName: 'Doe',
      age: 27,
      hobbies: [
        { id: 1, name: 'Bowling', description: 'sport & stuff' },
        { id: 2, name: 'Reading', type: 'read & stuff' },
        { id: 3, name: 'Gardening', type: 'plants & stuff' },
      ],
    };

    // serializer definition
    const userSerializer = new Serializer('user', {
      attributes: ['firstName', 'lastName', 'hobbies'],
      hobbies: {
        attributes: ['name'],
      },
    });

    const result = userSerializer.serialize(rawData);
    const { meta, data } = result;

    expect(meta.type).toEqual('user');
    expect(data).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      hobbies: [
        { name: 'Bowling' },
        { name: 'Reading' },
        { name: 'Gardening' },
      ],
    });
  });

  test('should throw an exception when no resource is given', () => {
    expect(() => {
      new Serializer(null, {
        attributes: ['firstName', 'lastName']
      });
    }).toThrow('Resource must be defined');
  });
});
