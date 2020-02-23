const graphql = require('graphql')
const { GraphQLObjectType } = graphql
const TechMutation = require('./techMutations')
const JobMutation = require('./jobMutations')

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...TechMutation,
    ...JobMutation
  }
})

module.exports = { Mutation }
