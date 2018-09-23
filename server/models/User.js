const mongoose = require('mongoose');

const USER_ROLES = require('../constants/roles')

const userSchema = mongoose.Schema({
  name: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    username: { type: String, default: '' }
  },
  age: { type: Number, default: null },
  email: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: null },
  title: { type: String, default: '' },
  password: String,
  picture: Buffer,
  role: { type: String, default: USER_ROLES.USER }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
