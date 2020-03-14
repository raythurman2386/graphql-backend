import Model from '../models/Model'

function tech(parent: { id: number }, args: { id: number; name: string }) {
  return Model.Tech.findById(parent.id)
}

export default {
  tech
}
