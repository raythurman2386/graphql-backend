const graphql = require('graphql')
const { Tech, Job } = require('../models/Model')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
})

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

module.exports = { UserType, TechType, JobType }
