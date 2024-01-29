const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'api.karpov.students.nomoredomainsmonster.ru',
  'karpov.students.nomoredomainsmonster.ru',
  'https://karpov.students.nomoredomainsmonster.ru',
  'http://karpov.students.nomoredomainsmonster.ru',
  'http://api.karpov.students.nomoredomainsmonster.ru',
  'https://api.karpov.students.nomoredomainsmonster.ru',
  '127.0.0.1:27017/moviesdb',
  'mongodb://127.0.0.1:27017/moviesdb',
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
