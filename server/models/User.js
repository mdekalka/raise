const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { USER_ROLES } = require('../constants/constants');

const COLLECTION_NAME = 'users';
const SALT_ROUNDS = 10;
const ROLES_ENUM = Object.values(USER_ROLES);

const UserSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
  },
  username: { type: String, required: true, unique: true },
  age: { type: Number, default: null },
  email: { type: String, required: true, lowercase: true, unique: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  title: { type: String, default: '' },
  password: { type: String, required: true },
  picture: { type: String, default: null },
  role: { type: String, enum: ROLES_ENUM, default: USER_ROLES.USER },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { collection: COLLECTION_NAME });

UserSchema.pre('save', function(next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
      if (err) {
        return next(err);
      }

      bcrypt.hash(this.password, salt, null, (err, hash) => {
        if (err) {
          return next(err)
        }

        this.password = hash;
        next();
      });
    })
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function(err, match) {
      if (err || !match) {
        reject(err || 'Invalid password');
      }
  
      resolve(match);
    });
  })
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
