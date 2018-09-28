const express = require('express');
const router = express.Router();

const User = require('../models/User');
const RESPONSE_ERRORS = require('../constants/responseErrors');

router.put('/settings', function(req, res) {
  User.findByIdAndUpdate(req.user._id, req.body)
    .then(() => {
      res.json({ message: 'User was sucessfully updated' });
    })
    .catch(err => {
      res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
    });
});

module.exports = router;
