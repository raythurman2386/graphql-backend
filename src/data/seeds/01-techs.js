exports.seed = async function(knex) {
  await knex('techs').insert([
    { name: 'Test1' },
    { name: 'Test2' },
    { name: 'Test3' },
    { name: 'Test4' },
    { name: 'Test5' }
  ])
}
