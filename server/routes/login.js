const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const USERS = require('../migrateScripts/usersMock')


// MOCKING DB just for test
const currentUser = USERS[0];

router.post('/', (req, res) => {
  const { username, password } = req.body;
  // Use your DB ORM logic here to find user and compare password
  const user = currentUser.name.username === username && currentUser.password === password;

  if (user) {
    //If all credentials are correct do this
    let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token

    res.json({
        user: {
          username: user.username,
          id: user.id
        },
        token
    });
  } else {
    res.status(400).json({
      token: null,
      error: 'Username or password is incorrect'
    });
  }
});

module.exports = router;