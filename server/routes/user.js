const express = require('express');
const router = express.Router();

const User = require('../models/User');
const RESPONSE_ERRORS = require('../constants/responseErrors');

router.put('/', function(req, res) {
  const { parameters: params } = req;
  const updatedUser = params.permit('age', 'email', 'title', { name: ['firstName', 'lastName'] }).value()
  
  User.findByIdAndUpdate(req.body._id, updatedUser)
    .then(() => {
      res.json({ message: 'User was sucessfully updated.' });
    })
    .catch(err => {
      res.status(500).json(RESPONSE_ERRORS.inaccessible_database);
    });
});

module.exports = router;
