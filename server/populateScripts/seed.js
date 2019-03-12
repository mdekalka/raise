const mongoose = require('mongoose');

const users = require('./usersMock');
const assignments = require('./assignmentsMock')
const issues = require('./issuesMock')
const User  = require('../models/User');
const Assignment = require('../models/Assignment')
const Issue = require('../models/Issue')

require('../config/databaseConnect');

const exit = () => {
  mongoose.disconnect();
  process.exit();
}

const dropModels = async () => {
  try {
    await User.deleteMany({})
    await Assignment.deleteMany({})
    await Issue.deleteMany({})
  } catch(err) {
    console.log(err)
  }
}

const seedUsers = async () => {
  return Promise.all(users.map(user => {
    return new User(user).save()
  }))
};

const seedAssignments = async () => {
  return Promise.all(assignments.map((assignment, index) => {
    return new Assignment(assignment).save()
      .then(assignment => {
        const newIssue = {
          ...issues[index],
          assignment: assignment._id
        }

        return Issue.create(newIssue).then(issue => {
          assignment.issues = [issue._id]

          return assignment.save()
        })
      })
  }))
}

const seedAll = async () => {
  await dropModels()

  await seedUsers()
  await seedAssignments()

  exit()
}

seedAll();
