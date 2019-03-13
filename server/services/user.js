const { EXPIRATION_TIME } = require('../constants/constants')

const resetUserPassword = (user, password) => {
  user.password = password;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  return user.save()
}

const setResetToken = (user, token) => {
  user.resetPasswordToken = token;
  user.resetPasswordExpires = EXPIRATION_TIME

  return user.save()
}

module.exports = {
  setResetToken,
  resetUserPassword
}
