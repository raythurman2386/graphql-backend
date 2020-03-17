import { Job } from '../models'

function jobs(parent: { id: number }, args: any) {
  return Job.findTechJobs(parent.id)
}

export default { jobs }
