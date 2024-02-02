const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require('../utils');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
} = require('../constants/constants');
const { JWT_SECRET, SALT, NODE_ENV } = require('../constants/constants');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev_key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => next(new UnauthorizedError('Incorrect email or password')));
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  return bcrypt
    .hash(password, SALT)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const { password: hashedPassword, ...userWithoutPassword } = user.toObject();
      res.status(HTTP_STATUS_CREATED).send({ data: userWithoutPassword });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('User with same name already exists'));
      } if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(', ');
        return next(new BadRequestError(`Validation error ${errorMessage}`));
      }
      return next(err);
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return res.status(HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid data format'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return res.status(HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Provided info is incorrect'));
      }
      return next(err);
    });
};

module.exports = {
  getUser,
  login,
  updateUser,
  createUser,
};
