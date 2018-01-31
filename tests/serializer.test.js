const { Serializer } = require('./../lib');

describe('Serializer multiple resource', () => {
  test('should throw an exception when no resource is given', () => {
    expect(() => {
      new Serializer(null, { // eslint-disable-line no-new
        attributes: ['firstName', 'lastName'],
      });
    }).toThrow('Resource must be defined');
  });

  test('should use the configured totalCount if provided', () => {
    const rawData = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Doe' },
    ];

    const userSerializer = new Serializer('user', {
      attributes: ['firstName', 'lastName'],
    });

    const result = userSerializer.serialize(rawData, { totalCount: 99 });
    const { meta } = result;
    expect(meta.count).toEqual(2);
    expect(meta.totalCount).toEqual(99);
  });

  test('should use the list count if no totalCount is provided', () => {
    const rawData = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Doe' },
    ];

    const userSerializer = new Serializer('user', {
      attributes: ['firstName', 'lastName'],
    });

    const result = userSerializer.serialize(rawData);
    const { meta } = result;
    expect(meta.count).toEqual(2);
    expect(meta.totalCount).toEqual(2);
  });

  test('should allow custom keys in meta', () => {
    const rawData = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Doe' },
    ];

    const userSerializer = new Serializer('user', {
      attributes: ['firstName', 'lastName'],
    });

    const result = userSerializer.serialize(rawData, {
      totalCount: 99,
      type: 'definitely_lizards',
      planet: 'earth',
    });

    const { meta } = result;
    expect(meta.count).toEqual(2);
    expect(meta.type).toEqual('user');
    expect(meta.totalCount).toEqual(99);
    expect(meta.planet).toEqual('earth');
  });
});
