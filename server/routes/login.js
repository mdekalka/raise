const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();


// MOCKING DB just for test
let users = [
  {
      id: 1,
      username: '123',
      password: '123'
  },
  {
      id: 2,
      username: 'test2',
      password: 'asdf12345'
  }
];

router.post('/', (req, res) => {
  const { username, password } = req.body;
  // Use your DB ORM logic here to find user and compare password
  const user = users.find(user => user.username === username && user.password === password )

  if (user) {
    //If all credentials are correct do this
    let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token

    res.json({
        user: {
          username: user.username,
          id: user.id
        },
        error: null,
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