const mongoose = require('mongoose');

const users = require('./usersMock');
const User  = require('../models/User');

require('../config/databaseConnect');

const exit = () => {
  mongoose.disconnect();
  process.exit();
}

const dropModels = async () => {
  try {
    await User.deleteMany({})
  } catch(err) {
    console.log(err)
  }
}

const seedUsers = () => {
  Promise.all(users.map(user => {
    return new User(user).save()
      .catch(err => {
        console.log(err);
        throw err;
      })
  }))
  .then(_ => {
    console.log('successfully seeds')
    exit();
  })
  .catch(err => {
    console.log('seeding failed with', err)
    exit();
  })
};

const seedAll = async () => {
  await dropModels()

  seedUsers()
}

seedAll();
