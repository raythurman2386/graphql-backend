import Model from './Model'
import { JobModel } from './Model'

export const User = new Model('users')
export const Tech = new Model('techs')
export const Job = new JobModel('jobs')
