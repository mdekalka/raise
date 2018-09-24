const express = require('express');
const joi = require('joi');
const router = express.Router();

const User = require('../models/User');
const { newUserValidation } = require('../validations/validations');

router.post('/', function(req, res) {
  const userData = req.body;
  const newUser = new User({
    name: {
      username: userData.username
    },
    email: userData.email,
    password: userData.password
  });

  joi.validate(newUser, newUserValidation, { abortEarly: false, allowUnknown: true }, err => {
    if (err) {
      res.status(400).json({ error: err.message, errorCode: 'invalid_data' });
    } else {
      newUser.save(err => {
        if (err) {
          res.status(500).json({ error: 'The operation can\'t be processed.', errorCode: 'inaccessible_database' });
          throw err;
        }
    
        res.json({ message: 'New user was successfully created' });
      });
    }
  });
});

module.exports = router;
