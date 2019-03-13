const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'assignment',
    index: true
  }
})

IssueSchema.statics.like = function(id) {
  const Issue = mongoose.model('issue')

  return Issue.findByIdAndUpdate(id, { $inc: { 'likes': 1 } }, { new: true })
}

const Assignment = mongoose.model('issue', IssueSchema);

module.exports = Assignment;