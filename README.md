# Jsonade

De/serialize json for consistency!

[![Build Status](https://travis-ci.org/icapps/jsonade.svg?branch=master)](https://travis-ci.org/icapps/jsonade)

## Installation

```bash
$ npm install jsonade
```


## Examples

### Basic example

#### Create a serializer

```javascript
const { Serializer } = require('jsonade');

const userSerializer = new Serializer('user', {
  attributes: ['firstName', 'lastName', 'address'],
  address: {
    attributes: ['street', 'number'],
  },
});
```

#### Serialize a single resource

```javascript
const data = {
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

const result = userSerializer.serialize(data);

//
// {
//   firstName: 'John',
//   lastName: 'Doe',
//   address: {
//     street: 'Markt',
//     number: '100',
//   },
// }
```

#### Serialize a list of resources

```javascript
const data = [
	{
	  firstName: 'John',
	  lastName: 'Doe',
	  age: 27,
	  address: {
	    street: 'Markt',
	    number: '100',
	    city: 'Zonnedorp',
	    country: 'Belgium',
	  },
	}, {
	  firstName: 'Jessie',
	  lastName: 'Doe',
	  age: 26,
	  address: {
	    street: 'Marketstreet',
	    number: '101',
	    city: 'Sunvillage',
	    country: 'United Kingdom',
	  },
	}
];

const result = userSerializer.serialize(data);

// result:
// [
//   {
//     firstName: 'John',
//     lastName: 'Doe',
//     address: {
//       street: 'Markt',
//       number: '100',
//     },
//   },
//   { ... },
// ]
```



### Example using a nested serializer

```javascript
const { Serializer } = require('jsonade');

const addressSerializer = new Serializer('address', {
  attributes: ['street', 'number'],
});

const userSerializer = new Serializer('user', {
  attributes: ['firstName', 'lastName', 'address'],
  address: addresssSerializer,
});

const data = {
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

const result = userSerializer.serialize(data);

// result:
// {
//   firstName: 'John',
//   lastName: 'Doe',
//   address: {
//     street: 'Markt',
//     number: '100',
//   },
// }
```

### Example using a function to transform one property

```javascript
const { Serializer } = require('jsonade');

const userSerializer = new Serializer('user', {
  attributes: ['firstName', 'lastName', 'age'],
  age: val => `${val} years old`,
});

const data = {
  firstName: 'John',
  lastName: 'Doe',
  age: '27',
};

const result = userSerializer.serialize(data);

// result:
// {
//   firstName: 'John',
//   lastName: 'Doe',
//   age: '27 years old',
// }
```

### Example serializing an error

```javascript
const { ErrorSerializer } = require('jsonade');
const errorResponse = ErrorSerializer.serialize(ex);
```


## Serializer

### `constructor`

```javascript
const mySerializer = new Serializer(resource, options);
```

#### Arguments

`resource (string)`: Name of the resource being serialized

`options (Object)`: Options for serialisation

Options:

- `attributes (Array)`: attributes to serialize

#### Returns

Returns an instance of a custom serializer, ready to use for serializing data.


## Serializer instance

### `serialize`

```javascript
mySerializer.serialize(data);
```

#### Arguments

`data (Object|Array)`: Dataset to serialize.

#### Returns

Returns a serialized data respresentation of the given data.


## ErrorSerializer

### `serialize`

#### Arguments

`error (Object|Array)`: Error(s) to serialize.

```javascript
const errors = ErrorSerializer.serialize([error]);
```

#### Returns

- `errors (Object)`: object containing multiple errors.

Every error can have these properties:


| key  |  |
|---|---|
| status | required |
| title | required |
| id  | optional |
| code | optional, application specific |
| detail | optional |
| meta | optional |


##### Example

```json
{
  "errors": [
    {
      "id": "ba4b9f14-5b83-4dfd-ac46-1c3868e1b3ec",
        "status": 400,
        "code": "2006",
        "title": "Article not found",
        "detail": "Article with id 892bb574-090d-4d63-a5b5-cb928d5f5c5f not found",
        "meta": {
          "stack": "NotFoundError: ..."
        }
    }
  ]
}
```
