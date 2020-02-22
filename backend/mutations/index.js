const graphql = require('graphql')
const { Tech, Job } = require('../models/Model')
const { TechType, JobType } = require('../types')
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTech: {
      type: TechType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        let tech = {
          name: args.name
        }
        return Tech.add(tech)
      }
    },
    updateTech: {
      type: TechType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        let tech = {
          name: args.name
        }

        return Tech.update(tech)
      }
    },
    deleteTech: {
      type: TechType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Tech.remove(parent.id)
      }
    },
    addJob: {
      type: JobType,
      args: {
        machine: { type: GraphQLString },
        complaint: { type: GraphQLString },
        tech_id: { type: GraphQLID }
      },
      resolve(parent, args) {
        let job = {
          machine: args.machine,
          complaint: args.complaint,
          tech_id: args.tech_id
        }

        return Job.add(job)
      }
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
      let Job = {
        machine: args.machine,
        complaint: args.complaint,
        tech_id: args.tech_id
      }

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
})

module.exports = { Mutation }