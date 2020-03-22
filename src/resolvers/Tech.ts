import { Job } from '../models';

function jobs(parent: { id: number }) {
  return Job.findTechJobs(parent.id);
}

export default { jobs };
