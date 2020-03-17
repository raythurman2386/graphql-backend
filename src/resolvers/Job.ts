import { Tech } from '../models'

function tech(parent: { id: number }, args: { id: number; name: string }) {
  return Tech.findById(parent.id)
}

export default {
  tech
}
