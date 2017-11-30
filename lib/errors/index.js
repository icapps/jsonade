class BaseError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

class UndefinedResourceError extends BaseError {
  constructor(message) {
    super(message || 'Resource must be defined');
  }
}

module.exports = {
  UndefinedResourceError,
};
