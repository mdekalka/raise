const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;


const Assignment = mongoose.model('assignment');
const Issue = mongoose.model('issue');

const AssignmentType = require('./assignment_type');
const IssueType = require('./issue_type');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    assignments: {
      type: new GraphQLList(AssignmentType),
      resolve() {
        return Assignment.find({});
      }
    },
    assignment: {
      type: AssignmentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Assignment.findById(id);
      }
    },
    issue: {
      type: IssueType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Issue.findById(id);
      }
    }
  })
});

module.exports = RootQuery;