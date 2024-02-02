const {
  INTERNAL_SERVER_ERROR,
} = require('../constants/constants');

// eslint-disable-next-line
const errorHandler = (err, _, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  const errMessage = err.message || 'Internal Server Error';
  res.status(statusCode).json({ message: errMessage });
};

module.exports = {
  errorHandler,
};
