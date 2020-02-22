const db = require('../data/db-config')

class Model {
  constructor(tablename) {
    this.tablename = tablename
  }

  find() {
    return db(this.tablename)
  }

  findBy(filter) {
    return db(this.tablename).where(filter).first()
  }

  add(item) {
    return db(this.tablename).insert(item).returning('*')
  }

  update(id, item) {
    return db(this.tablename).where({ id }).update(item).returning('*')
  }

  remove(id) {
    return db(this.tablename).where({ id }).del()
  }
}

const Tech = new Model('techs')
const Job = new Model('jobs')

module.exports = { Tech, Job }