const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
  res.json({
    message: 'Please check your email for steps to reset your password'
  })
});

module.exports = router;
