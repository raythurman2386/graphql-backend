import Model from '../models/Model'

function jobs(parent: { id: number }, args: any) {
  return Model.Job.findTechJobs(parent.id)
}

export default { jobs }
