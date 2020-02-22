
exports.up = async function (knex) {
  await knex.schema.createTable('techs', tbl => {
    tbl.increments('id')
    tbl.string('name').notNullable()
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('techs')
};
