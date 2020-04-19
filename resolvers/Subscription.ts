import { PubSub } from 'apollo-server';
export const JOB_ADDED = 'JOB_ADDED';

export const pubsub = new PubSub();

function newJob(_parent: any, _args: any, _context: any, _info: any) {
  return pubsub.asyncIterator([JOB_ADDED]);
}

export default {
  newJob
};
