const joi = require('joi');

const MIN_USERNAME_LENGTH = 5;
const MIN_PASSWORD_LENGTH = MIN_USERNAME_LENGTH;

const validate = (data, validation, options) => {
  return new Promise((resolve, reject) => {
    joi.validate(data, validation, options, err => {
      if (err) {
        reject(err.message);
      }

      resolve();
    })
  })
}

const emailValidation = joi.string().email();
const newUserValidation = joi.object().keys({
  username: joi.string().min(MIN_USERNAME_LENGTH).required(),
  email: emailValidation.required(),
  password: joi.string().min(MIN_PASSWORD_LENGTH).required()
});
const validateUserLogin = (user) => {
  const validation = joi.object().keys({
    username: joi.string().min(MIN_USERNAME_LENGTH).required(),
    password: joi.string().min(MIN_PASSWORD_LENGTH).required()
  })

  return validate(user, validation)
}


module.exports = {
  validate,
  emailValidation,
  newUserValidation,
  validateUserLogin
};
