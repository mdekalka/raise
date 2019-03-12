const express = require('express');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const router = express.Router();

const User = require('../models/User');
const passportAuth = require('../auth/passport');
const { MONGO_ERROR_NAME, MONGO_ERRORS } = require('../constants/mongoErrors');
const { newUserValidation } = require('../validations/validations');
const RESPONSE_ERRORS = require('../constants/responseErrors');

router.post('/', function(req, res) {
  const userData = req.body;
  const newUser = {
    name: {
      username: userData.username
    },
    email: userData.email,
    password: userData.password
  };

  joi.validate(newUser, newUserValidation, { abortEarly: false }, err => {
    if (err) {
      res.status(400).json({ error: err.message, errorCode: 'invalid_data' });
    } else {
      new User(newUser).save()
        .then(user => {
          const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: passportAuth.expirationTime });

          res.json({ message: 'New user was successfully created.', token: passportAuth.tokenize(token) });
        })
        .catch(err => {
          if (err.name === MONGO_ERROR_NAME && err.code === MONGO_ERRORS.duplicate) {
            return res.status(400).json({ error: 'The user with provided username or email already exists.', errorCode: 'duplicate_value' });
          }

          res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
        });
    }
  });
});

module.exports = router;
