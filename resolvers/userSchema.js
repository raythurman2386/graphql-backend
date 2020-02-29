const graphql = require('graphql')
const { User } = require('../models/Model')
const { GraphQLID, GraphQLList } = graphql
const { UserType } = require('../types')

const userSchema = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return User.findById(args.id)
    }
  },
  users: {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
      return User.find()
    }
  }
}

module.exports = userSchema
