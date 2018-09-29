const express = require('express');
const router = express.Router();

const User = require('../models/User');
const RESPONSE_ERRORS = require('../constants/responseErrors');

router.get('/', function(req, res) {
  User.find({ $nor: [{ _id: req.user._id }] }).select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.log(err, "!!")
      res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
    });
});

module.exports = router;
