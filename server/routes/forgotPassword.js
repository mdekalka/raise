const express = require('express');
const joi = require('joi');
const crypto = require('crypto');
const router = express.Router();

const User = require('../models/User');
const { emailValidation } = require('../validations/validations');
const RESPONSE_ERRORS = require('../constants/responseErrors');

router.post('/', function(req, res, next) {
  const email = req.body.email;

  joi.validate(email, emailValidation.required(), { abortEarly: false }, err => {
    if (err) {
      res.status(400).json({ error: err.message, errorCode: 'invalid_email' });
    } else {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            res.status(400).json({ error: 'No account with that email exists.' });
          } else {
            crypto.randomBytes(20, function(err, buffer) {
              if (err) {
                res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
              }

              const token= buffer.toString('hex');
              user.resetPasswordToken = token;
              user.resetPasswordExpires = Date.now() + 3600000;

              user.save({ upsert: true }).then(() => {
                res.json({ resetToken: token });
              }).catch(err => {
                res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
              })

            });
          }
        })
        .catch(err => {
          res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
        });
    }
  });
});

router.post('/reset', function(req, res, next) {
  const { token, password } = req.body;

  User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }).then(user => {
    if(!user) {
      res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
    } else {
      user.password = password;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      user.save().then(() => {
        res.json({ message: 'Your password wassuccessfully updated.'});
      })
      .catch(err => {
        res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
      })
    }
  })
  .catch(err => {
    res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
  })

});

module.exports = router;
