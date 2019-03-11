const mongoose = require('mongoose');

const users = require('./usersMock');
const assignments = require('./assignmentsMock')
const User  = require('../models/User');
const Assignment = require('../models/Assignment')

require('../config/databaseConnect');

const exit = () => {
  mongoose.disconnect();
  process.exit();
}

const dropModels = async () => {
  try {
    await User.deleteMany({})
    await Assignment.deleteMany({})
  } catch(err) {
    console.log(err)
  }
}

const seedUsers = async () => {
  return Promise.all(users.map(user => {
    return new User(user).save()
  }))
};

const seedAssignments = async() => {
  return Promise.all(assignments.map(assignment => {
    return new Assignment(assignment).save()
  }))
}

const seedAll = async () => {
  await dropModels()

  await seedUsers()
  await seedAssignments()

  exit()
}

seedAll();
