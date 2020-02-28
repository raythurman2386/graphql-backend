const graphql = require('graphql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models/Model')
const { UserType } = require('../types')
const { GraphQLID, GraphQLString } = graphql

const UserMutation = {
  signUp: {
    type: UserType,
    args: {
      name: { type: GraphQLString }
    },

    async resolve(parent, args) {
      const password = await bcrypt.hash(args.password, 10)
      let user = await User.add({ ...args, password })

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

      return {
        token,
        user
      }
    }
  },

  login: {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },

    async resolve(parent, args) {
      const user = await User.findBy({ email: args.email })
      if (!user) {
        throw new Error('No such user found')
      }

      const valid = await bcrypt.compare(args.password, user.password)
      if (!valid) {
        throw new Error('Invalid Password')
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

      return {
        token,
        user
      }
    }
  },

  deleteUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID }
    },

    resolve(parent, args) {
      return User.remove(parent.id)
    }
  }
}

module.exports = UserMutation
