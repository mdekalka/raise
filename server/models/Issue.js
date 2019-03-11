const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  assignment: {
    type: Schema.Types.ObjectId,
    ref: 'assignment'
  }
})

IssueSchema.statics.like = function(id) {
  const Issue = mongoose.model('issue')

  return Issue.findById(id).then(issue => {
    ++issue.likes;

    return issue.save()
  })
}

const Assignment = mongoose.model('issue', IssueSchema);

module.exports = Assignment;