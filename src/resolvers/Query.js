const { Tech, Job } = require('../models/Model')

function techs(root, args) {
  return Tech.find()
}

function jobs(root, args) {
  return Job.find()
}

function tech(root, args) {
  return Tech.findById(args.id)
}

function job(root, args) {
  return Job.findById(args.id)
}

module.exports = {
  techs,
  jobs,
  tech,
  job
}
