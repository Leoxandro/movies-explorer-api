const Movie = require('../models/movie');
const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} = require('../utils/index');
const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
} = require('../constants/constants');

const getSavedMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      res.status(HTTP_STATUS_OK).send({ data: movies });
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(HTTP_STATUS_CREATED).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid data format'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Movie was not found');
      }
      const owner = movie.owner.toString();
      const user = req.user._id;

      if (owner !== user) {
        throw new ForbiddenError('No permission to delete a movie');
      }
      return movie.deleteOne().then(() => res.status(HTTP_STATUS_OK).send({ message: 'Movie successfully deleted', data: movie }));
    })
    .catch(next);
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
