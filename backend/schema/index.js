const graphql = require('graphql')
const { Tech, Job } = require('../models/Model')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = graphql

const TechType = new GraphQLObjectType({
  name: 'Tech',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    jobs: {
      type: new GraphQLList(JobType),
      resolve(parent, args) {
        return Job.findTechJobs(parent.id)
      }
    }
  })
})

const JobType = new GraphQLObjectType({
  name: 'Job',
  fields: () => ({
    id: { type: GraphQLID },
    machine: { type: GraphQLString },
    complaint: { type: GraphQLString },
    tech: {
      type: TechType,
      resolve(parent, args) {
        return Tech.findById(parent.tech_id)
      }
    }
  })
})

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
  query: RootQuery
})