import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<any> {
  await knex('techs').insert([
    { name: 'Test1' },
    { name: 'Test2' },
    { name: 'Test3' },
    { name: 'Test4' },
    { name: 'Test5' }
  ])
}
