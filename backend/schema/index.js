const graphql = require('graphql')

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphql

const TechType = new GraphQLObjectType({
  name: 'Tech',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
})

const JobType = new GraphQLObjectType({
  name: 'Job',
  fields: () => ({
    id: { type: GraphQLInt },
    machine: { type: GraphQLString },
    complaint: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    tech: {
      type: TechType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        // code to get data from db
        // args.id
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})