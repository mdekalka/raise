const graphql = require('graphql');
const mongoose = require('mongoose');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const Assignment = mongoose.model('assignment');
const Issue = mongoose.model('issue');

const AssignmentType = require('./assignment_type');
const IssueType = require('./issue_type');

const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAssignment: {
      type: AssignmentType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue, { title, description }) {
        return (new Assignment({ title, description })).save()
      }
    },
    addIssueToAssignment: {
      type: AssignmentType,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        assignmentId: { type: GraphQLID }
      },
      resolve(parentValue, { title, content, assignmentId }) {
        return Assignment.addIssue(assignmentId, title, content);
      }
    },
    likeIssue: {
      type: IssueType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Issue.like(id);
      }
    },
    removeAssignment: {
      type: AssignmentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return AssignmentType.remove({ _id: id });
      }
    },
    updateAssignment: {
      type: AssignmentType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue, { id, title, description }) {
        AssignmentType.findByIdAndUpdate(id, { title, description })
      }
    }
  }
});

module.exports = mutations;