import Model from '../models/Model'

function techs(root: any, args: any) {
  return Model.Tech.find()
}

function jobs(root: any, args: any) {
  return Model.Job.find()
}

function tech(root: any, args: { id: number }) {
  return Model.Tech.findById(args.id)
}

function job(root: any, args: { id: number }) {
  return Model.Job.findById(args.id)
}

export default {
  techs,
  jobs,
  tech,
  job
}
