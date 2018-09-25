const express = require('express');
const joi = require('joi');
const router = express.Router();

const User = require('../models/User');
const { emailValidation } = require('../validations/validations');

router.post('/', function(req, res, next) {
  const data = req.body;
  const { email } = data;

  // TODO: joigoose is not seems a good options nowadays, look for more stable validation
  joi.validate(email, emailValidation.required(), { abortEarly: false }, err => {
    if (err) {
      res.status(400).json({ error: err.message, errorCode: 'invalid_email' });
    } else {
      User.findOne({ email })
        .then(_ => {
          res.json({ message: 'Please check your email for steps to reset your password' });
        })
        .catch(err => {
          res.status(500).json({ error: 'The operation can\'t be processed', errorCode: 'inaccessible_database' })
        });
    }
  });
});

module.exports = router;
