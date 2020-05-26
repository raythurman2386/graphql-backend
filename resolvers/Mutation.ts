import { hashPassword, comparePassword } from '../utils/passwordTools';
import { JOB_ADDED, pubsub } from './Subscription';
import { User, Job, Tech } from '../models';
import generateToken from '../token/generateToken';
import { checkUser } from '../utils/checkEmail';
import resetToken from '../token/resetToken';
import { sendgridEmail } from '../utils/sendgrid';

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

const signup = async (_parent: any, args: LoginValues) => {
  const password: string = await hashPassword(args.password);

  await checkUser(args);

  const [user] = await User.add({ ...args, password });

  const token: string = await generateToken(user);

  return {
    token,
    user
  };
};

const login = async (_parent: any, args: LoginValues) => {
  const user = await User.findBy({ email: args.email });

  if (!user) {
    throw new Error('No such user found');
  }

  await comparePassword(args.password, user.password);

  const token: string = await generateToken(user);

  return {
    token,
    user
  };
};

const addTech = async (_parent: any, args: TechValues) => {
  try {
    const [tech] = await Tech.add(args);
    return tech;
  } catch (error) {
    throw new Error(error);
  }
};

const addJob = async (_parent: any, args: JobValues) => {
  try {
    const tech = await Tech.findById(args.tech_id);
    args.tech_id = tech.id;
    const [job] = await Job.add(args);
    pubsub.publish(JOB_ADDED, { newJob: args });
    return job;
  } catch (error) {
    throw new Error(error);
  }
};

const updateTech = async (_parent: any, args: TechValues) => {
  try {
    const [tech] = await Tech.update(args.id, args);
    return tech;
  } catch (error) {
    throw new Error(error);
  }
};

const updateJob = async (_parent: any, args: JobValues) => {
  try {
    const tech = await Tech.findById(args.tech_id);
    args.tech_id = tech.id;
    const [job] = await Job.update(args.id, args);
    return job;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTech = async (_parent: any, args: TechValues) => {
  try {
    const tech = await Tech.remove(args.id);
    return tech;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteJob = async (_parent: any, args: JobValues) => {
  try {
    const job = await Job.findById(args.id);
    await Job.remove(args.id);
    return job;
  } catch (error) {
    throw new Error(error);
  }
};

const initiateReset = async (_parent: any, args: { email: string }) => {
  try {
    const user = await User.findBy({ email: args.email });
    await sendgridEmail(user.email);
    return resetToken(user.email);
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  signup,
  login,
  addTech,
  addJob,
  updateTech,
  updateJob,
  deleteTech,
  deleteJob,
  initiateReset
};
