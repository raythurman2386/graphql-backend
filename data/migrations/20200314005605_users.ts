import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('users', tbl => {
    tbl.increments('id');
    tbl.string('name').notNullable();
    tbl
      .string('email')
      .notNullable()
      .unique();
    tbl.string('password').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('users');
}
