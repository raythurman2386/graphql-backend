import { PubSub } from 'apollo-server'
export const JOB_ADDED = 'JOB_ADDED'

export const pubsub = new PubSub()

function newJob(parent: any, args: any, context: any, info: any) {
  return pubsub.asyncIterator([JOB_ADDED])
}

export default {
  newJob
}
