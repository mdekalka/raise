const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { sendResponse } = require('../utils/utils')

router.get('/', async function(req, res) {

  try {
    const users = await User.find({ $nor: [{ _id: req.user._id }] }).select('-password')

    return sendResponse(res, 200, users)
  } catch (err) {
    return sendResponse(res)
  }
});

module.exports = router;
