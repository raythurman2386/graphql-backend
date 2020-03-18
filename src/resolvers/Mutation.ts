import bcrypt from 'bcryptjs'
import { JOB_ADDED, pubsub } from './Subscription'
import { User, Job, Tech } from '../models'
import generateToken from '../token/generateToken'


interface LoginValues {
  email: string;
  password: string;
}


interface TechValues {
  id: number;
  name: string;
}

interface JobValues {
  id: number;
  machine: string;
  complaint: string;
  tech_id: number;
}



async function signup(root: any, args: { password: string }) {
  const password: string = await bcrypt.hash(args.password, 10)

  const [user] = await User.add({ ...args, password })

  const token = await generateToken(user)

  return {
    token,
    user
  }
}

async function login(root: any, args: LoginValues) {
  const user = await User.findBy({ email: args.email })

  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid Password')
  }

  const token: string = await generateToken(user)

  return {
    token,
    user
  }
}

const addTech = async (parent: any, args: TechValues) => {
  try {
    const [tech] = await Tech.add(args)
    return tech
  } catch (error) {
    throw new Error(error)
  }
}

const addJob = async (parent: any, args: JobValues) => {
  try {
    const tech = await Tech.findById(args.tech_id)
    args.tech_id = tech.id
    const [job] = await Job.add(args)
    pubsub.publish(JOB_ADDED, { newJob: args })
    return job
  } catch (error) {
    throw new Error(error)
  }
}

const updateTech = async (parent: any, args: TechValues) => {
  try {
    const [tech] = await Tech.update(args.id, args)
    return tech
  } catch (error) {
    throw new Error(error)
  }
}

const updateJob = async (parent: any, args: JobValues) => {
  try {
    const [job] = await Job.update(args.id, args)
    return job
  } catch (error) {
    throw new Error(error)
  }
}

const deleteTech = async (parent: any, args: TechValues) => {
  try {
    await Tech.remove(args.id)
    return 'Tech Removed'
  } catch (error) {
    throw new Error(error)
  }
}

const deleteJob = async (parent: any, args: JobValues) => {
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
