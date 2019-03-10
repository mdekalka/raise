const mongoose = require('mongoose');

const users = require('./usersMock');
const User  = require('../models/User');

require('../config/databaseConnect');

function exit() {
  mongoose.disconnect();
  process.exit();
}

function loadUsers() {
  Promise.all(users.map(user => {
    return new User(user).save()
      .then(_ => {})
      .catch(err => {
        console.log(err);
        throw err;
      })
  }))
  .finally(_ => {
    console.log('populated')
    exit();
  })
};

loadUsers();