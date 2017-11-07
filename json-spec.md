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

Successfull creation of a resouurce:
Request:

- HTTP method: POST
- Content-Type: application/json

Response:

- HTTP status code: 201
- Body: created single resourse


### Update single resource

Successfull update of a resouurce:

Request:

- HTTP method: PUT
- Content-Type: application/json

Response:

- HTTP status code: 201
- Body: updated single resourse


### Delete single resource

Successfull deleted of a resouurce:

Request:

- HTTP method: DELETE
- Content-Type: application/json

Response:

- HTTP status code: 204
- Body: empty


## Error responses

Requests are not always successfull. When this is the case, one or more errors are returned.

#### Example

```json
{
  "errors": [
    {
      "id": "ba4b9f14-5b83-4dfd-ac46-1c3868e1b3ec",
      "status": 400, // same as http status code
      "code": "2006", // application specific
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

