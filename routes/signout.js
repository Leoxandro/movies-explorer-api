const express = require('express');
const cookieParser = require('cookie-parser');
const { HTTP_STATUS_OK } = require('../constants/constants');

const router = express.Router();
router.use(cookieParser());

router.post('/signout', (req, res) => {
  res.clearCookie('jwt');

  res.status(HTTP_STATUS_OK).json({ message: 'User signed out successfully' });
});

module.exports = router;
