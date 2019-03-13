const joi = require('joi');

const MIN_USERNAME_LENGTH = 5;
const MIN_PASSWORD_LENGTH = 5;
const MIN_AGE = 18;
const MAX_AGE = 123;
const MAX_STRING_LENGTH = 265;

const username = joi.string().min(MIN_USERNAME_LENGTH).required()
const password = joi.string().min(MIN_PASSWORD_LENGTH).required()
const email = joi.string().email()
const string = joi.string().max(MAX_STRING_LENGTH)

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

const validateEmail = (userEmail) => {
  return validate(userEmail, email.required())
}

const validateUserCreation = (user) => {
  const validation = joi.object().keys({ username, email: email.required(), password });

  return validate(user, validation)
} 

const validateUserLogin = (user) => {
  const validation = joi.object().keys({ username, password })

  return validate(user, validation)
}

const validateUserUpdate = (user) => {
  const validation = joi.object().keys({
    email,
    age: joi.number().integer().min(MIN_AGE).max(MAX_AGE),
    title: string,
    name: joi.object().keys({
      firstName: string,
      lastName: string
    })
  })

  return validate(user, validation)
}


module.exports = {
  validate,
  validateEmail,
  validateUserCreation,
  validateUserLogin,
  validateUserUpdate
};
