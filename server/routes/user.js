const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { sendResponse } = require('../utils/utils')
const { validateUserUpdate } = require('../validations/validations')

router.put('/', async function(req, res) {
  const { parameters: params } = req;
  const updatedUser = params.permit('age', 'email', 'title', { name: ['firstName', 'lastName'] }).value()

  try {
    await validateUserUpdate(updatedUser)
  } catch(err) {
    return sendResponse(res, 400, { error: err.message, errorCode: 'invalid_data' })
  }
  
  try {
    await User.findByIdAndUpdate(req.body._id, updatedUser)

    return sendResponse(res, 200, { message: 'User was sucessfully updated.' })
  } catch (err) {
    return sendResponse(res)
  }
});

module.exports = router;
