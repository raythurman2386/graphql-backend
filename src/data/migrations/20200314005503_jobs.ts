import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('jobs', tbl => {
    tbl.increments('id')
    tbl.string('machine').notNullable()
    tbl.string('complaint').notNullable()
    tbl
      .integer('tech_id')
      .references('id')
      .inTable('techs')
      .unsigned()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('jobs')
}

