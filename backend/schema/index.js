const graphql = require('graphql')
const { Tech, Job } = require('../models/Model')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = graphql
const { TechType, JobType } = require('../types')
const { Mutation } = require('../mutations')

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    tech: {
      type: TechType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // args.id
        return Tech.findById(args.id)
      }
    },
    techs: {
      type: new GraphQLList(TechType),
      resolve(parent, args) {
        return Tech.find()
      }
    },
    job: {
      type: JobType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Job.findById(args.id)
      }
    },
    jobs: {
      type: new GraphQLList(JobType),
      resolve(parent, args) {
        return Job.find()
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})