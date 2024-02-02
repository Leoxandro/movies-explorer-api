const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signInSchema, signUpSchema } = require('../middlewares/validation');
const { NotFoundError } = require('../utils/NotFoundError');

router.post('/signin', signInSchema, login);
router.post('/signup', signUpSchema, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Requested resource was not found'));
});

module.exports = router;
