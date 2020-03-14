import bcrypt from 'bcryptjs'
import Model from '../models/Model'
import generateToken from '../token/generateToken'

async function signup(args: { password: string }) {
  const password = await bcrypt.hash(args.password, 10)

  const [user] = await Model.User.add({ ...args, password })

  const token = await generateToken(user)

  return {
    token,
    user
  }
}

async function login(args: { email: string; password: string }) {
  const user = await Model.User.findBy({ email: args.email })

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

const addTech = async (parent: any, args: any) => {
  try {
    const [tech] = await Model.Tech.add(args)
    return tech
  } catch (error) {
    throw new Error(error)
  }
}

const addJob = async (parent: any, args: any) => {
  try {
    const [job] = await Model.Job.add(args)
    return job
  } catch (error) {
    throw new Error(error)
  }
}

const updateTech = async (parent: any, args: { id: number }) => {
  try {
    const [tech] = await Model.Tech.update(args.id, args)
    return tech
  } catch (error) {
    throw new Error(error)
  }
}

const updateJob = async (parent: any, args: { id: number }) => {
  try {
    const [job] = await Model.Job.update(args.id, args)
    return job
  } catch (error) {
    throw new Error(error)
  }
}

const deleteTech = async (parent: any, args: { id: number }) => {
  try {
    await Model.Tech.remove(args.id)
    return 'Tech Removed'
  } catch (error) {
    throw new Error(error)
  }
}

const deleteJob = async (parent: any, args: { id: any }) => {
  try {
    await Job.remove(args.id)
    return 'Job Removed'
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
  deleteTech,
  deleteJob
}
