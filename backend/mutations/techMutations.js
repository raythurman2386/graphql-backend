const graphql = require('graphql')
const { Tech } = require('../models/Model')
const { TechType } = require('../types')
const { GraphQLID, GraphQLString } = graphql

const TechMutation = {
  addTech: {
    type: TechType,
    args: {
      name: { type: GraphQLString }
    },
    resolve(parent, args) {
      let tech = new TechType({
        name: args.name
      })
      return Tech.add(tech)
    }
  },
  updateTech: {
    type: TechType,
    args: {
      name: { type: GraphQLString }
    },
    resolve(parent, args) {
      let tech = new TechType({
        name: args.name
      })

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
  }
}

module.exports = TechMutation
