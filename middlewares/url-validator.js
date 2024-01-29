const isURL = require('validator/lib/isURL');
const { NotFoundError } = require('../utils/NotFoundError');

const checkURL = (url) => {
  if (!isURL(url, { require_protocol: true })) {
    throw new NotFoundError('Provided link is invalid');
  }
  return url;
};

module.exports = {
  checkURL,
};
