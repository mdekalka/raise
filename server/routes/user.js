const express = require('express');
const router = express.Router();

router.get('/settings', function(req, res, next) {
  const userId = req.param.id;

  res.json({
    a: 'joho'
  })
});

module.exports = router;
