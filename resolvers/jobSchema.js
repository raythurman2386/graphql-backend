const graphql = require('graphql')
const { Job } = require('../models/Model')
const { GraphQLID, GraphQLList } = graphql
const { JobType } = require('../types')

const jobSchema = {
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

module.exports = jobSchema
