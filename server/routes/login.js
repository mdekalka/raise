const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/', (req, res) => {
  const { username, password } = req.body;

  // TODO: validate username/password
  User.findOne({ 'name.username': username })
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: 'The requested user not found.', errorCode: 'not_found'})
      } else {
        user.comparePassword(password, function(err, match) {
          if (match && !err) {
            const token = jwt.sign({ id: user._id, username: user.name.username }, 'keyboard cat 4 ever', { expiresIn: 129600 });

            res.json({ userId: user._id, token });
          } else {
            res.status(400).json({ error: 'The password does not match.', errorCode: 'invalid_data' });
          }
        });
      }

      res.status(400).json({
        token: null,
        error: 'Username or password is incorrect',
        errorCode: 'invalid_data'
      });
    })
    .catch(_ => {
      res.status(500).json({ error: 'The operation can\'t be processed', errorCode: 'inaccessible_database'});
    });
});

module.exports = router;