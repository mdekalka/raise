const express = require('express');
const joi = require('joi');
const crypto = require('crypto');
const router = express.Router();

const User = require('../models/User');
const { emailValidation } = require('../validations/validations');
const RESPONSE_ERRORS = require('../constants/responseErrors');
const userService = require('../services/user')

router.post('/', function(req, res, next) {
  const  { email } = req.body;

  joi.validate(email, emailValidation.required(), { abortEarly: false }, err => {
    if (err) {
      res.status(400).json({ error: err.message, errorCode: 'invalid_email' });
    }

    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.status(400).json({ error: 'No account with that email exists.' });
        }

        crypto.randomBytes(20, function(err, buffer) {
          if (err) {
            res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
          }

          const token = buffer.toString('hex');

          userService.setResetToken(user, token)
            .then(() => res.json({ resetToken: token }))
            .catch(() => res.status(500).json(RESPONSE_ERRORS.inaccessible_database))
        });
      })
      .catch(err => {
        res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
      });
  });
});

router.post('/reset', function(req, res, next) {
  const { token, password } = req.body;

  User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
    .then(user => {
      if(!user) {
        res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
      }

      userService.resetUserPassword(user, password)
        .then(() => res.json({ message: 'Your password wassuccessfully updated.'}))
        .catch(() => res.status(500).json(RESPONSE_ERRORS.inaccessible_database))
    })
    .catch(err => {
      res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
    })
});

module.exports = router;
