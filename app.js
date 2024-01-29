// eslint-disable-next-line
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const { signInSchema, signUpSchema } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/error-handler');
const { NotFoundError } = require('./utils');
const { PORT, MONGODB } = require('./utils/constants');

mongoose
  .connect(MONGODB)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(`Error during MongoDB connection: ${error}`));

const app = express();

app.use(cors);

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', signInSchema, login);
app.post('/signup', signUpSchema, createUser);
app.use(auth);
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

app.use(errorLogger);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Requested resource was not found'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
