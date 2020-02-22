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

  findById(id) {
    return db(this.tablename).where({ id }).first()
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

class JobModel extends Model {
  constructor(tablename) {
    super(tablename)
    this.tablename = tablename
  }

  findTechJobs(id) {
    return db('jobs').where({ tech_id: id })
  }
}

const Tech = new Model('techs')
const Job = new JobModel('jobs')

module.exports = { Tech, Job }