const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created: { type: Date, default: Date.now },
  issues: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'issue'
  }]
})

AssignmentSchema.statics.addIssue = function(id, title, content) {
  const Issue = mongoose.model('issue')

  return this.findById(id).then(assignment => {
    const issue = new Issue({ assignment, title, content })

    assignment.issues = [...assignment.issues, issue]

    return Promise.all([issue.save(), assignment.save()])
      .then(([_, assignment]) => assignment)
  })
}

AssignmentSchema.statics.findIssues = function(id) {
  return this.findById(id)
    .populate('issues')
    .then(assignment => assignment.issues);
}

const Assignment = mongoose.model('assignment', AssignmentSchema);

module.exports = Assignment;