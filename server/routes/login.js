const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const passportAuth = require('../auth/passport');
const User = require('../models/User');
const RESPONSE_ERRORS = require('../constants/responseErrors');

router.post('/', (req, res) => {
  const { username, password } = req.body;

  // TODO: validate username/password
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: 'The requested user not found.', errorCode: 'not_found'})
      } else {
        user.comparePassword(password, function(err, match) {
          if (match && !err) {
            const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: passportAuth.expirationTime });

            res.json({ token: passportAuth.tokenize(token) });
          } else {
            res.status(400).json({ error: 'The password does not match.', errorCode: 'invalid_data' });
          }
        });
      }
    })
    .catch(_ => {
      res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
    });
});

module.exports = router;