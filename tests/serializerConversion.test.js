const { Serializer } = require('./../lib');
const convertKey = require('./../lib/utils/key-conversion.util');
const { isArray } = require('lodash');

function checkCase(obj, convertCase) {
  Object.keys(obj).map((k) => {
    if (isArray(obj[k])) {
      return obj[k].map(d => checkCase(d, convertCase));
    }
    return expect(convertKey(k, convertCase)).toEqual(k);
  });
}

function checkResponseKeysCase(data, convertCase) {
  if (isArray(data)) {
    data.map(d => checkCase(d, convertCase));
  } else {
    checkCase(data, convertCase);
  }
}
describe('Serializer multiple resource caseConversion', () => {
  const rawData = [
    { firstName: 'John', lastName: 'Doe' },
    { firstName: 'Jane', lastName: 'Doe' },
  ];
  test('should return the data converted into snake_case', () => {
    const userSerializer = new Serializer('user', {
      attributes: ['firstName', 'lastName'],
    }, { case: 'snake_case' });

    const result = userSerializer.serialize(rawData, { totalCount: 99 });
    const { meta } = result;
    expect(meta.count).toEqual(2);
    expect(meta.count).toEqual(2);
    expect(meta.totalCount).toEqual(99);
    checkResponseKeysCase(result.data, 'snake_case');
  });
  test('should return the data converted into kebab-case', () => {
    const userSerializer = new Serializer('user', {
      attributes: ['firstName', 'lastName'],
    }, { case: 'kebab-case' });

    const result = userSerializer.serialize(rawData, { totalCount: 99 });
    const { meta } = result;
    expect(meta.count).toEqual(2);
    expect(meta.count).toEqual(2);
    expect(meta.totalCount).toEqual(99);
    checkResponseKeysCase(result.data, 'kebab-case');
  });
  test('should return the data converted into camelCase', () => {
    const userSerializer = new Serializer('user', {
      attributes: ['firstName', 'lastName'],
    }, { case: 'camelCase' });

    const result = userSerializer.serialize(rawData, { totalCount: 99 });
    const { meta } = result;
    expect(meta.count).toEqual(2);
    expect(meta.count).toEqual(2);
    expect(meta.totalCount).toEqual(99);
    checkResponseKeysCase(result.data, 'camelCase');
  });
});

describe('Serializer single resource caseConversion', () => {
  const rawData = { firstName: 'John', lastName: 'Doe' };
  test('should return the data converted into snake_case', () => {
    const userSerializer = new Serializer('user', {
      attributes: ['firstName', 'lastName'],
    }, { case: 'snake_case' });
    const result = userSerializer.serialize(rawData, { totalCount: 99 });
    checkResponseKeysCase(result.data, 'snake_case');
  });
  test('should return the data converted into kebab-case', () => {
    const userSerializer = new Serializer('user', {
      attributes: ['firstName', 'lastName'],
    }, { case: 'kebab-case' });

    const result = userSerializer.serialize(rawData, { totalCount: 99 });
    checkResponseKeysCase(result.data, 'kebab-case');
  });
  test('should return the data converted into camelCase', () => {
    const userSerializer = new Serializer('user', {
      attributes: ['firstName', 'lastName'],
    }, { case: 'camelCase' });

    const result = userSerializer.serialize(rawData, { totalCount: 99 });
    checkResponseKeysCase(result.data, 'camelCase');
  });
});
describe('Serializer nested resource caseConversion', () => {
  test('should succesfully use a nested serializer on a list of data', () => {
    // raw data
    const rawData = {
      firstName: 'John',
      lastName: 'Doe',
      age: 27,
      addressDetail: [
        {
          streetName: 'Markt',
          houseNumber: '100',
          city: 'Zonnedorp',
          country: 'Belgium',
        }, {
          streetName: 'Kerkstraat',
          houseNumber: '69',
          city: 'Zonnedorp',
          country: 'Belgium',
        },
      ],
    };

    // serializer definition
    const addressSerializer = new Serializer(
      'addressDetail',
      { attributes: ['streetName', 'houseNumber'] },
      { case: 'snake_case' },
    );

    const userSerializer = new Serializer(
      'user',
      {
        attributes: ['firstName', 'lastName', 'addressDetail'],
        addressDetail: addressSerializer,
      },
      { case: 'snake_case' },
    );
    const result = userSerializer.serialize(rawData);
    const { meta, data } = result;

    expect(meta.type).toEqual('user');
    expect(data).toEqual({
      first_name: 'John',
      last_name: 'Doe',
      address_detail: [
        {
          street_name: 'Markt',
          house_number: '100',
        }, {
          street_name: 'Kerkstraat',
          house_number: '69',
        },
      ],
    });
  });
});

describe('Serializer multiple nested resource caseConversion', () => {
  const rawData = [{
    firstName: 'John',
    lastName: 'Doe',
    age: 27,
    addressDetail: [
      {
        streetName: 'Markt',
        houseNumber: '100',
        city: 'Zonnedorp',
        country: 'Belgium',
      }, {
        streetName: 'Kerkstraat',
        houseNumber: '69',
        city: 'Zonnedorp',
        country: 'Belgium',
      },
    ],
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 27,
    addressDetail: [
      {
        streetName: 'Markt',
        houseNumber: '100',
        city: 'Zonnedorp',
        country: 'Belgium',
      }, {
        streetName: 'Kerkstraat',
        houseNumber: '69',
        city: 'Zonnedorp',
        country: 'Belgium',
      },
    ],
  },
  ];
  test('should succesfully use a nested serializer on a list of data with snake_case keys', () => {
    // serializer definition
    const addressSerializer = new Serializer(
      'addressDetail',
      { attributes: ['streetName', 'houseNumber'] },
      { case: 'snake_case' },
    );

    const userSerializer = new Serializer(
      'user',
      {
        attributes: ['firstName', 'lastName', 'addressDetail'],
        addressDetail: addressSerializer,
      },
      { case: 'snake_case' },
    );
    const result = userSerializer.serialize(rawData);
    const { meta, data } = result;

    expect(meta.type).toEqual('user');
    checkResponseKeysCase(data, 'snake_case');
  });
  test('should succesfully use a nested serializer on a list of data with kebab-case keys', () => {
    // serializer definition
    const addressSerializer = new Serializer(
      'addressDetail',
      { attributes: ['streetName', 'houseNumber'] },
      { case: 'kebab-case' },
    );

    const userSerializer = new Serializer(
      'user',
      {
        attributes: ['firstName', 'lastName', 'addressDetail'],
        addressDetail: addressSerializer,
      },
      { case: 'kebab-case' },
    );
    const result = userSerializer.serialize(rawData);
    const { meta, data } = result;

    expect(meta.type).toEqual('user');
    checkResponseKeysCase(data, 'kebab-case');
  });
  test('should succesfully use a nested serializer on a list of data with camelCase keys', () => {
    // serializer definition
    const addressSerializer = new Serializer(
      'addressDetail',
      { attributes: ['streetName', 'houseNumber'] },
      { case: 'camelCase' },
    );

    const userSerializer = new Serializer(
      'user',
      {
        attributes: ['firstName', 'lastName', 'addressDetail'],
        addressDetail: addressSerializer,
      },
      { case: 'camelCase' },
    );
    const result = userSerializer.serialize(rawData);
    const { meta, data } = result;

    expect(meta.type).toEqual('user');
    checkResponseKeysCase(data, 'camelCase');
  });
});
