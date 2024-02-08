const { HTTP_STATUS_CONFLICT } = require('../constants/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

module.exports = { ConflictError };
