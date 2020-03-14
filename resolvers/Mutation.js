const bcrypt = require('bcryptjs')
const { User, Tech, Job } = require('../models/Model')
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

const addJob = async (parent, args, context, info) => {
  try {
    const [job] = await Job.add(args)
    return job
  } catch (error) {
    throw new Error(error)
  }
}

const updateTech = async (parent, args, context, info) => {
  try {
    const [tech] = await Tech.update(args.id, args)
    return tech
  } catch (error) {
    throw new Error(error)
  }
}

const updateJob = async (parent, args, context, info) => {
  try {
    const [job] = await Job.update(args.id, args)
    return job
  } catch (error) {
    throw new Error(error)
  }
}

const deleteTech = async (parent, args, context, info) => {
  try {
    await Tech.remove(args.id)
    return 'Tech Removed'
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  signup,
  login,
  addTech,
  addJob,
  updateTech,
  updateJob,
  deleteTech
}
