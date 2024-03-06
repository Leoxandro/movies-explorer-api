const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'api.karpov.nomoredomainswork.ru',
  'karpov.nomoredomainswork.ru',
  'https://karpov.nomoredomainswork.ru',
  'http://karpov.nomoredomainswork.ru',
  'http://api.karpov.nomoredomainswork.ru',
  'https://api.karpov.nomoredomainswork.ru',
  '127.0.0.1:27017/mestodb',
  'mongodb://127.0.0.1:27017/mestodb',
  '*',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', 'true');

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
