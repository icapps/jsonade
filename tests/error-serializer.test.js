const { ErrorSerializer } = require('./../lib');

describe('ErrorSerializer', () => {
  test('should succesfully serialize 1 error', () => {
    const ex = {
      id: "ba4b9f14-5b83-4dfd-ac46-1c3868e1b3ec",
      status: 400,
      code: "2006",
      title: "Article not found",
      detail: "Article with id 892bb574-090d-4d63-a5b5-cb928d5f5c5f not found",
        randomKey: 'random',
      meta: {
        stack: "NotFoundError: ..."
      },
    };
    const result = ErrorSerializer.serialize(ex);

    expect(result).toEqual({
      errors: [
        {
          id: "ba4b9f14-5b83-4dfd-ac46-1c3868e1b3ec",
          status: 400,
          code: "2006",
          title: "Article not found",
          detail: "Article with id 892bb574-090d-4d63-a5b5-cb928d5f5c5f not found",
          meta: {
            stack: "NotFoundError: ..."
          }
        }
      ]
    })
  });

  test('should succesfully serialize multiple errors', () => {
    const ex = [
      {
        id: "ba4b9f14-5b83-4dfd-ac46-1c3868e1b3ec",
        status: 400,
        code: "2006",
        title: "Article not found",
        detail: "Article with id 892bb574-090d-4d63-a5b5-cb928d5f5c5f not found",
        randomKey: 'random',
        meta: {
          stack: "NotFoundError: ..."
        },
      }, {
        status: 400,
        title: "Article not found",
      }
    ];
    const result = ErrorSerializer.serialize(ex);

    expect(result).toEqual({
      errors: [
        {
          id: "ba4b9f14-5b83-4dfd-ac46-1c3868e1b3ec",
          status: 400,
          code: "2006",
          title: "Article not found",
          detail: "Article with id 892bb574-090d-4d63-a5b5-cb928d5f5c5f not found",
          meta: {
            stack: "NotFoundError: ..."
          }
        }, {
          status: 400,
          title: "Article not found",
        }
      ]
    })
  });

  test('should throw an error when required keys are not present', () => {

    expect(() => {
      const result = ErrorSerializer.serialize({
        status: 400,
      });
    }).toThrow();

    expect(() => {
      const result = ErrorSerializer.serialize({
        title: 'Title',
      });
    }).toThrow();
  });
});
