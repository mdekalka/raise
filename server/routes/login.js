const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const passportAuth = require('../auth/passport');
const User = require('../models/User');
const { validateUserLogin } = require('../validations/validations')
const { sendResponse } = require('../utils/utils')

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    await validateUserLogin({ username, password })
  } catch(err) {
    return sendResponse(res, 400, { error: err.message, errorCode: 'invalid_data' })
  }

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return sendResponse(res, 400, { error: 'The requested user not found.', errorCode: 'not_found' })
    }

    try {
      await user.comparePassword(password)

      const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: passportAuth.expirationTime });

      return res.json({ token: passportAuth.tokenize(token) });
    } catch (err) {
      return sendResponse(res, 400, { error: 'The password does not match.', errorCode: 'invalid_data' })
    }

  } catch(err) {
    return sendResponse(res)
  }
});

module.exports = router;
