import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  await knex('jobs').insert([
    { machine: 'test', complaint: 'something', tech_id: 1 },
    { machine: 'test', complaint: 'something', tech_id: 1 },
    { machine: 'test2', complaint: 'something', tech_id: 2 },
    { machine: 'test2', complaint: 'something', tech_id: 2 },
    { machine: 'test3', complaint: 'something', tech_id: 3 },
    { machine: 'test3', complaint: 'something', tech_id: 3 },
    { machine: 'test4', complaint: 'something', tech_id: 4 },
    { machine: 'test4', complaint: 'something', tech_id: 4 },
    { machine: 'test5', complaint: 'something', tech_id: 5 },
    { machine: 'test5', complaint: 'something', tech_id: 5 }
  ]);
}
