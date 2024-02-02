const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/UnauthorizedError');
const { JWT_SECRET, NODE_ENV } = require('../constants/constants');

module.exports = (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev_key');
  } catch (err) {
    next(new UnauthorizedError('Token is invalid'));
  }

  req.user = payload;
  next();
};
