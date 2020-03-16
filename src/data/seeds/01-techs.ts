import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<any> {
  await knex('techs').insert([
    { name: 'Herb' },
    { name: 'Jason' },
    { name: 'Josh' },
    { name: 'Devon' },
    { name: 'Noah' },
    { name: 'Brady' },
    { name: 'Eddy' }
  ])
}
