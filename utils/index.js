const { ConflictError } = require('./ConflictError');
const { NotFoundError } = require('./NotFoundError');
const { ForbiddenError } = require('./ForbiddenError');
const { BadRequestError } = require('./BadRequestError');
const { UnauthorizedError } = require('./UnauthorizedError');

module.exports = {
  ConflictError,
  NotFoundError,
  ForbiddenError,
  BadRequestError,
  UnauthorizedError,
};
