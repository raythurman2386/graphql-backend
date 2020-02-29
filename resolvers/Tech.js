const { Job } = require('../models/Model')

function jobs(parent, args) {
  return Job.findTechJobs(parent.id)
}
