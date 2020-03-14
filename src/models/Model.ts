import db from '../data/db-config'

class Model {
  tablename: string
  constructor(tablename: string) {
    this.tablename = tablename
  }

  find() {
    return db(this.tablename)
  }

  findBy(filter: { email: string }) {
    return db(this.tablename)
      .where(filter)
      .first()
  }

  findById(id: number) {
    return db(this.tablename)
      .where({ id })
      .first()
  }

  add(item: object) {
    return db(this.tablename)
      .insert(item)
      .returning('*')
  }

  update(id: number, item: object) {
    return db(this.tablename)
      .where({ id })
      .update(item)
      .returning('*')
  }

  remove(id: number) {
    return db(this.tablename)
      .where({ id })
      .del()
  }
}

class JobModel extends Model {
  constructor(tablename: string) {
    super(tablename)
    this.tablename = tablename
  }

  findTechJobs(id: any) {
    return db('jobs').where({ tech_id: id })
  }
}

const User = new Model('users')
const Tech = new Model('techs')
const Job = new JobModel('jobs')

export default { User, Tech, Job }
