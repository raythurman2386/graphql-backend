import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('techs', tbl => {
    tbl.increments('id')
    tbl.string('name').notNullable()
  })
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('techs')
}
