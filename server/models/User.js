const mongoose = require('mongoose');

const USER_ROLES = require('../constants/roles');

const userSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    username: { type: String, required: true }
  },
  age: { type: Number, default: null },
  email: { type: String, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: null },
  title: { type: String, default: '' },
  password: { type: String, required: true },
  picture: Buffer,
  role: { type: String, default: USER_ROLES.USER }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
