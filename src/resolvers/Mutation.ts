import bcrypt from 'bcryptjs'
import { PubSub } from 'apollo-server'
import Model from '../models/Model'
import generateToken from '../token/generateToken'

const pubsub = new PubSub()

async function signup(root: any, args: { password: string }) {
  const password = await bcrypt.hash(args.password, 10)

  const [user] = await Model.User.add({ ...args, password })

  const token = await generateToken(user)

  return {
    token,
    user
  }
}

async function login(root: any, args: { email: string; password: string }) {
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

const JOB_ADDED = 'JOB_ADDED'

const addJob = async (parent: any, args: any) => {
  try {
    const [job] = await Model.Job.add(args)
    pubsub.publish(JOB_ADDED, { newJob: args })
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
    const job = await Model.Job.findById(args.id)
    await Model.Job.remove(args.id)
    return job
  } catch (error) {
    throw new Error(error)
  }
}

export default {
  signup,
  login,
  addTech,
  addJob,
  updateTech,
  updateJob,
  deleteTech,
  deleteJob
}
