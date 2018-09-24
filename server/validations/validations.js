const joi = require('joi');

const MIN_USERNAME_LENGTH = 5;
const MIN_PASSWORD_LENGTH = MIN_USERNAME_LENGTH;

const emailValidation = joi.string().email();
const newUserValidation = joi.object().keys({
  name: {
    username: joi.string().min(MIN_USERNAME_LENGTH).required()
  },
  email: emailValidation.required(),
  password: joi.string().min(MIN_PASSWORD_LENGTH).required()
});


module.exports = {
  emailValidation,
  newUserValidation
};
