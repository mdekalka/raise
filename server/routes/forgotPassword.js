const express = require('express');
const joi = require('joi');
const router = express.Router();

const User = require('../models/User');
const { emailValidation } = require('../validations/validations');

router.post('/', function(req, res, next) {
  const data = req.body;
  const { email } = data;

  joi.validate(email, emailValidation.required(), err => {
    console.log(err, 'ERROR')
    console.log(err.message,'NAME')
  })


  if (!email) {
    res.status(400).json({ error: 'You should provide an email.', errorCode: 'empty_email' });
  }

  joi.validate(email, emailValidation, err => {
    if (err) {
      res.status(400).json({ error: 'You should provide an valid email.', errorCode: 'invalid_email' });
    } else {
      User.findOne({ email }, (err, user) => {
        if (err) {
          res.status(500).json({ error: 'The request can\'t be processed', errorCode: 'inaccessible_database' });
          throw err;
        }

        res.json({ message: 'Please check your email for steps to reset your password' });
      });
    }
  });
});

module.exports = router;
