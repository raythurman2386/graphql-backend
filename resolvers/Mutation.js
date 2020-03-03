const bcrypt = require('bcryptjs')
const { User } = require('../models/Model')
const generateToken = require('../token/generateToken')

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)

  const [user] = await User.add({ ...args, password })

  const token = await generateToken(user)

  return {
    token,
    user
  }
}

async function login(parent, { email, password }, context) {
  const { user, info } = context.authenticate('graphql-local', {
    email,
    password
  })

  return {
    user
  }
}

module.exports = {
  signup,
  login
}
