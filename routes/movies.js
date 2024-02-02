const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { checkURL } = require('../middlewares/url-validator');
const {
  getSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(checkURL, 'image link validation'),
    trailerLink: Joi.string().required().custom(checkURL, 'image link validation'),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(checkURL, 'image link validation'),
    movieId: Joi.number().required(),
  }),
}), createMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
