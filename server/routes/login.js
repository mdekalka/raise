const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const passportAuth = require('../auth/passport');
const User = require('../models/User');
const RESPONSE_ERRORS = require('../constants/responseErrors');
const { validateUserLogin } = require('../validations/validations')

const comparePassword = (user, password, res) => {
  return user.comparePassword(password)
    .then(() => {
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: passportAuth.expirationTime });

      return res.json({ token: passportAuth.tokenize(token) });
    })
    .catch(err => {
      return res.status(400).json({ error: 'The password does not match.', errorCode: 'invalid_data' });
    })
} 

router.post('/', (req, res) => {
  const { username, password } = req.body;

  validateUserLogin({ username, password })
    .then(() => {
      User.findOne({ username })
        .then(user => {
          if (!user) {
            res.status(400).json({ error: 'The requested user not found.', errorCode: 'not_found'})
          }

          return comparePassword(user, password, res)
        })
        .catch(() => res.status(500).json(RESPONSE_ERRORS.inaccessible_database))
    })
    .catch(err => {
      res.status(400).json({ error: err });
    })
});

module.exports = router;