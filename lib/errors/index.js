class BaseError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

class TotalCountOptionError extends BaseError {
  constructor(message) {
    super(message || 'Option totalCount must be defined when serializing an array');
  }
}

class UndefinedResourceError extends BaseError {
  constructor(message) {
    super(message || 'Resource must be defined');
  }
}

module.exports = {
  TotalCountOptionError,
  UndefinedResourceError,
};
