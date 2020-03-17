import bcrypt from 'bcryptjs'
import { JOB_ADDED, pubsub } from './Subscription'
import { User, Job, Tech } from '../models'
import generateToken from '../token/generateToken'

async function signup(root: any, args: { password: string }) {
  const password = await bcrypt.hash(args.password, 10)

  const [user] = await User.add({ ...args, password })

  const token = await generateToken(user)

  return {
    token,
    user
  }
}

async function login(root: any, args: { email: string; password: string }) {
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

const addTech = async (parent: any, args: any) => {
  try {
    const [tech] = await Tech.add(args)
    return tech
  } catch (error) {
    throw new Error(error)
  }
}

const addJob = async (parent: any, args: any) => {
  try {
    const tech = await Tech.findById(args.tech_id)
    args.tech_id = tech.id
    const [job] = await Job.addNewJob(args)
    pubsub.publish(JOB_ADDED, { newJob: args })
    return job
  } catch (error) {
    throw new Error(error)
  }
}

const updateTech = async (parent: any, args: { id: number }) => {
  try {
    const [tech] = await Tech.update(args.id, args)
    return tech
  } catch (error) {
    throw new Error(error)
  }
}

const updateJob = async (parent: any, args: { id: number }) => {
  try {
    const [job] = await Job.update(args.id, args)
    return job
  } catch (error) {
    throw new Error(error)
  }
}

const deleteTech = async (parent: any, args: { id: number }) => {
  try {
    await Tech.remove(args.id)
    return 'Tech Removed'
  } catch (error) {
    throw new Error(error)
  }
}

const deleteJob = async (parent: any, args: { id: any }) => {
  try {
    const job = await Job.findById(args.id)
    await Job.remove(args.id)
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
