const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1440 * 60 * 1000,
  max: 500,
  delayMs: 500,
  message: 'You have reached your limit of requests',
});

module.exports = limiter;
