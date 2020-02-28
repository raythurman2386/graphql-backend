const graphql = require('graphql')
const { GraphQLObjectType } = graphql
const UserMutation = require('./userMutations')
const TechMutation = require('./techMutations')
const JobMutation = require('./jobMutations')

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...UserMutation,
    ...TechMutation,
    ...JobMutation
  }
})

module.exports = { Mutation }
