const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');
const passportAuth = require('../auth/passport');
const { validateUserCreation } = require('../validations/validations');
const { sendResponse } = require('../utils/utils')
const { MONGO_ERROR_NAME, MONGO_ERRORS } = require('../constants/constants');

router.post('/', async function(req, res) {
  const { parameters: params } = req;
  const newUser = params.permit('username', 'email', 'password').value()

  try {
    await validateUserCreation(newUser)
  } catch(err) {
    return sendResponse(res, 400, { error: err.message, errorCode: 'invalid_data' })
  }

  try {
    const user = await new User(newUser).save()
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: passportAuth.expirationTime });

    return sendResponse(res, 200, { message: 'New user was successfully created.', token: passportAuth.tokenize(token) })

  } catch (err) {
    if (err.name === MONGO_ERROR_NAME && err.code === MONGO_ERRORS.duplicate) {
      return sendResponse(res, 400, { error: 'The user with provided username or email already exists.', errorCode: 'duplicate_value' });
    }

    return sendResponse(res)
  }
});

module.exports = router;
