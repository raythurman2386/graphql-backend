const graphql = require('graphql')
const { Job } = require('../models/Model')
const { JobType } = require('../types')
const { GraphQLID, GraphQLString } = graphql

const JobMutation = {
  addJob: {
    type: JobType,
    args: {
      machine: { type: GraphQLString },
      complaint: { type: GraphQLString },
      tech_id: { type: GraphQLID }
    },
    resolve(parent, args) {
      let job = new JobType({
        machine: args.machine,
        complaint: args.complaint,
        tech_id: args.tech_id
      })

      return Job.add(job)
    }
  },

  updateJob: {
    type: JobType,
    args: {
      machine: { type: GraphQLString },
      complaint: { type: GraphQLString },
      tech_id: { type: GraphQLID }
    },
    resolve(parent, args) {
      let Job = new JobType({
        machine: args.machine,
        complaint: args.complaint,
        tech_id: args.tech_id
      })

      return Job.update(Job)
    }
  },
  deleteJob: {
    type: JobType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parent, args) {
      return Job.remove(parent.id)
    }
  }
}

module.exports = JobMutation
