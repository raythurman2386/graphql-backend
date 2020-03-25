import { Tech } from '../models';

function tech(parent: { tech_id: number }) {
  return Tech.findById(parent.tech_id);
}

export default {
  tech
};
