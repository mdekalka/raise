const joi = require('joi');

const emailValidation = joi.string().email();

// const newUserValidation = joi.object().keys({
//   username:
// });

module.exports = {
  emailValidation,
};
