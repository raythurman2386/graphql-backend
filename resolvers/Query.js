const { Tech, Job } = require('../models/Model')

function techs(root, args) {
  return Tech.find()
}

function jobs(root, args) {
  return Job.find()
}

module.exports = {
  techs,
  jobs
}
