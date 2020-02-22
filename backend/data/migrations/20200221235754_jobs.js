
exports.up = async function (knex) {
  await knex.schema.createTable('jobs', tbl => {
    tbl.increments('id')
    tbl.string('machine').notNullable()
    tbl.string('complaint').notNullable()
    tbl.int('tech_id').references('id').inTable('techs').unsigned().onUpdate('CASCADE').onDelete('CASCADE')
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('jobs')
};
