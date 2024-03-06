// eslint-disable-next-line
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/error-handler');
const router = require('./routes/index');
const limiter = require('./helpers/limiter');
const { PORT, MONGODB } = require('./constants/constants');

mongoose
  .connect(MONGODB)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(`Error during MongoDB connection: ${error}`));

const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://karpov.nomoredomainswork.ru',
    'http://karpov.nomoredomainswork.ru',
    'https://api.karpov.nomoredomainswork.ru',
    'http://api.karpov.nomoredomainswork.ru',
    '127.0.0.1:27017/mestodb',
    'mongodb://127.0.0.1:27017/mestodb',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use(cors(options));

app.use(express.json());

app.use(requestLogger);
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
