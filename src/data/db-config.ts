import knex from 'knex'

import dbConfig from '../knexfile'

const env = process.env.NODE_ENV

export default knex(dbConfig['development'])
