const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const Assignment = mongoose.model('assignment');
const IssueType = require('./issue_type');

const AssignmentType = new GraphQLObjectType({
  name:  'AssignmentType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    issues: {
      type: new GraphQLList(IssueType),
      resolve(parentValue) {
        return Assignment.findIssues(parentValue.id);
      }
    }
  })
});

module.exports = AssignmentType;
