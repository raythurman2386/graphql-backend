import db from '../data/db-config'

class Model {
  tablename: string
  constructor(tablename: string) {
    this.tablename = tablename
  }

  find() {
    return db(this.tablename)
  }

  findBy(filter: any) {
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

export class JobModel extends Model {
  constructor(tablename: string) {
    super(tablename)
    this.tablename = tablename
  }

  findTechJobs(id: any) {
    return db('jobs').where({ tech_id: id })
  }

  addNewJob(item: any) {
    return db('jobs')
      .insert(item)
      .returning('*')
  }
}

export default Model
