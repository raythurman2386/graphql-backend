const bcrypt = require('bcryptjs')
const { User, Tech } = require('../models/Model')
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

async function login(parent, args, context, info) {
  const user = await User.findBy({ email: args.email })

  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid Password')
  }

  const token = await generateToken(user)

  return {
    token,
    user
  }
}

const addTech = async (parent, args, context, info) => {
  try {
    const [tech] = await Tech.add(args)
    return tech
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  signup,
  login,
  addTech
}
