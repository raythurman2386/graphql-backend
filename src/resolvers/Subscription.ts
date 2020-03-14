import { PubSub } from 'apollo-server'
const JOB_ADDED = 'JOB_ADDED'

const pubsub = new PubSub()

function newJob(parent: any, args: any, context: any, info: any) {
  return pubsub.asyncIterator([JOB_ADDED])
}

export default {
  newJob
}