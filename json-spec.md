# iCapps - JSON request/response specification

## Goals

The goal is to specify a consistent api request/repsonse cycle while keeping enough room for project specific implementation.


## General rules

- Every property is always returned in the response, even when `null`.


## Responses

### List of resources


Return a succesfull response for a list of resource with root properties:

- meta: `Object`
- data: `Array`


#### Example

```json
# GET /posts/?offset=100&limit=50

{
  "meta": {
    "count": 50,
    "totalCount": 120
  },
  "data": [
    {
      "id": "1",
      "name": "abc",
      "description": "def",
      "price": null,
      "author": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "categories": [
        {
          "id": "2",
          "name": "Category A",
          "color": "yellow"
        }
      ]
    }
  ]
}
```

### Get single resource

Return a succesfull response for a single resource with root properties:

- meta: `Object`
- data: `Object`


#### Example

```json
# GET /posts/123

{
  "meta": {},
  "data": {
    "id": "1",
    "name": "abc",
    "description": "def",
    "price": null,
    "author": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "categories": [
    {
      "id": "2",
      "name": "Category A",
      "color": "yellow"
    }
    ]
  }
}
```


### Create single resource

Successfull creation of a resource:

##### Request:
- HTTP method: `POST`
- Headers:
	- Content-Type: `application/json`

##### Response:

- HTTP status code: `201`
- Body: created single resource


### Update single resource

Successfull update of a resource:

##### Request:

- HTTP method: `PUT`
- Headers:
	- Content-Type: `application/json`
##### Response:

- HTTP status code: `201`
- Body: updated single resource


### Delete single resource

Successfull deleted of a resource:

##### Request:

- HTTP method: `DELETE`
- Headers:
	- Content-Type: `application/json`

#### Response:

- HTTP status code: `204`
- Body: empty


## Specific specifications

### Version check

##### Request:

- HTTP method: `GET`
- Path: `/version/ios`
- Headers:
	- Content-Type: `application/json`

##### Response example

```json
{
  "meta": {},
  "data": {
    "minVersion": "1.4.0",
    "currentVersion": "1.8.0"
  }
}
```

### Login

##### Request:

- HTTP method: `POST`
- Path: `/login`
- Headers:
	- Content-Type: `application/json`

##### Body example

```json
{
    "username": "test",
    "password": "test",
    "deviceId": "1234"
}
```

##### Response example

```json
# POST /login

{
    "meta": {},
    "data": {
        "accessToken": "123456",
        "refreshToken": "123456"
  }
}
```

### Refresh access token

Get new `accessToken` based on a valid `refreshToken`.

##### Request:

- HTTP method: `POST`
- Path: `/refresh`
- Headers:
	- Content-Type: `application/json`
	- Authorization: `Bearer accessToken`

##### Body example

```json
{
    "refreshToken": "123456"
}
```

##### Response example

```json
{
  "meta": {},
  "data": {
    "accessToken": "123456",
    "refreshToken": "123456"
  }
}
```

### Retrieve current user

##### Request

- HTTP method: `GET`
- Path: `/me`
- Headers:
	- Content-Type: `application/json`
	- Authorization: `Bearer accessToken`

##### Response example

```json
{
  "meta": {},
  "data": {
    "id": 1,
    "email": "info@icapps.com"
  }
}
```

### Logout a user <Optional>

Successfull logout a user

- HTTP method: `POST`
- Path: `/logout`
- Headers:
	- Content-Type: `application/json`
	- Authorization: `Bearer accessToken`


##### Response example:

- HTTP status code: `204`
- Body: empty


## Error responses

Requests are not always successfull. When this is the case, one or more errors are returned.

#### Example

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

## Http status codes in use


|  Code  | Description  |
|---|---|
|200 | Success |
|201 | Created |
|204 | No content |
|400 | Bad request |
|401 | Unauthorized |
|403 | Forbidden |
|404 | Not found |
|500 | Server error |

