const express = require('express');
const crypto = require('crypto');
const router = express.Router();

const User = require('../models/User');
const { EXPIRATION_TIME } = require('../constants/constants');
const { validateEmail } = require('../validations/validations')
const { sendResponse } = require('../utils/utils')

router.post('/', async function(req, res, next) {
  const  { email } = req.body;

  try {
    await validateEmail(email)
  } catch (err) {
    return sendResponse(res, 400, { error: err.message, errorCode: 'invalid_email' })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return sendResponse(res, 400, { error: 'No account with that email exists.' })
    }

    crypto.randomBytes(20, async function(err, buffer) {
      if (err) {
        return sendResponse(res)
      }

      const token = buffer.toString('hex');

      user.resetPasswordToken = token;
      user.resetPasswordExpires = EXPIRATION_TIME
    
      try {
        await user.save()

        return sendResponse(res, 200, { resetToken: token })
      } catch (err) {
        throw new Error('user save failed')
      }
    });
  } catch (err) {
    return sendResponse(res)
  }
});

router.post('/reset', async function(req, res, next) {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })

    if (!user) {
      return sendResponse(res, 400, { error: 'Password reset token is invalid or has expired.' })
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
  
    try {
      await user.save()

      return sendResponse(res, 200, { message: 'Your password wassuccessfully updated.'})
    } catch (err) {
      throw new Error('user save failed')
    }

  } catch (err) {
    return sendResponse(res)
  }
});

module.exports = router;
