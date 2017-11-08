# Jasonalize

De/serialize json for consistency!

[![Build Status](https://travis-ci.org/icapps/jasonalize.svg?branch=master)](https://travis-ci.org/icapps/jasonalize)

## Installation

```bash
$ npm install ...
```


## Examples

### Basic example

#### Create a serializer

```javascript
const { Serializer } = require('jasonalize');

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
```



### Example using a nested serializer

```javascript
const { Serializer } = require('jasonalize');

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


### `serialize`

```javascript
mySerializer.serialize(data);
```

#### Arguments

`data (Object|Array)`: Dataset to serialize.
