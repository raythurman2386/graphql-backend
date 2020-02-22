const graphql = require('graphql')
const { Tech } = require('../models/Model')
const { GraphQLID, GraphQLList } = graphql
const { TechType } = require('../types')

const techSchema = {
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
  }
}

module.exports = techSchema