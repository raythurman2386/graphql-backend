import { Tech, Job } from '../models';

function techs() {
  return Tech.find();
}

function jobs() {
  return Job.find();
}

function tech(root: any, args: { id: number }) {
  return Tech.findById(args.id);
}

function job(root: any, args: { id: number }) {
  return Job.findById(args.id);
}

export default {
  techs,
  jobs,
  tech,
  job
};
