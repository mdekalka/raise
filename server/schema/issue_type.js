const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql;

const Issue = mongoose.model('issue');

const IssueType = new GraphQLObjectType({
  name:  'IssueType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    assignment: {
      type: require('./assignment_type'),
      resolve(parentValue) {
        return Issue.findById(parentValue).populate('assignment')
          .then(issue => issue.assignment);
      }
    }
  })
});

module.exports = IssueType;