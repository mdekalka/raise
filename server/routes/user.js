const express = require('express');
const router = express.Router();

router.get('/settings', function(req, res, next) {
  console.log(req.query.userId, "req")
  // if (req.user && req.user._id === )

  

  res.json({
    a: 'joho'
  })
});

module.exports = router;
