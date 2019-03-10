const express = require('express');
const router = express.Router();

const User = require('../models/User');
const RESPONSE_ERRORS = require('../constants/responseErrors');

router.put('/', function(req, res) {
  const user = req.body

  const updated = {
    name: {
      firstName: user.name.firstName,
      lastName: user.name.lastName,
    },
    age: user.age,
    email: user.email,
    title: user.title
  }
  
  User.findByIdAndUpdate(req.user._id, updated)
    .then(() => {
      res.json({ message: 'User was sucessfully updated.' });
    })
    .catch(err => {
      res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
    });
});

module.exports = router;
