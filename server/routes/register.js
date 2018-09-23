const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/', function(req, res, next) {
  const userData = req.body;
  const newUser = new User({
    name: {
      username: userData.username
    },
    email: userData.email,
    password: userData.password
  });
 
  newUser.save(err => {
    if (err) {
      res.status(500).json({ message: 'New account can\'t be created.', error: err });
      throw err;
    }

    res.json({ message: 'New user was successfully created' });
  });
});

module.exports = router;
