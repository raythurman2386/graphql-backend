import { Tech, Job } from '../models'

function techs(root: any, args: any) {
  return Tech.find()
}

function jobs(root: any, args: any) {
  return Job.find()
}

function tech(root: any, args: { id: number }) {
  return Tech.findById(args.id)
}

function job(root: any, args: { id: number }) {
  return Job.findById(args.id)
}

export default {
  techs,
  jobs,
  tech,
  job
}
