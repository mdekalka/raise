const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const passportAuth = require('../auth/passport');
const User = require('../models/User');
const RESPONSE_ERRORS = require('../constants/responseErrors');
const { validateUserLogin } = require('../validations/validations')

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    await validateUserLogin({ username, password })
  } catch(error) {
    return res.status(400).json({ error });
  }

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({ error: 'The requested user not found.', errorCode: 'not_found'})
    }

    try {
      const token = await user.comparePassword(password)

      return res.json({ token });
    } catch (err) {
      return res.status(400).json({ error: 'The password does not match.', errorCode: 'invalid_data' });
    }

  } catch(err) {
    return res.status(500).json(RESPONSE_ERRORS.inaccessible_database)
  }
});

module.exports = router;
