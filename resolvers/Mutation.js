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
  const findUser = await User.findBy(email)
  console.log(findUser)

  const valid = await bcrypt.compare(password, findUser.password)

  const token = generateToken(user)

  const { user, info } = await context.authenticate('graphql-local', {
    email,
    password
  })

  return {
    user,
    token
  }
}

module.exports = {
  signup,
  login
}
