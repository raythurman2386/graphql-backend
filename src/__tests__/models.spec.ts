import { User, Job, Tech } from './../models/index';
import db from '../data/db-config';

// beforeAll(async () => {
//   await db.seed.run();
// });

describe('Models tests', () => {
  test('should find all items in db', async () => {
    const users = await User.find();
    const jobs = await Job.find();
    const techs = await Tech.find();

    expect(users.length).toBeGreaterThan(0);
    expect(jobs.length).toBeGreaterThan(0);
    expect(techs.length).toBeGreaterThan(0);
  });

  test('should find items by id', async () => {
    const user = await User.findById(1);
    const job = await Job.findById(1);
    const tech = await Tech.findById(1);

    expect(user.id).toBe(1);
    expect(user.name).toBeDefined();
    expect(job.id).toBe(1);
    expect(job.machine).toBeDefined();
    expect(tech.id).toBe(1);
    expect(tech.name).toBeDefined();
  });

  test('should find items by a field', async () => {
    const job = await Job.findBy({ machine: 'test' });
    const tech = await Tech.findBy({ name: 'Herb' });

    expect(job.machine).toBe('test');
    expect(job.id).toBe(1);
    expect(tech.name).toBe('Herb');
    expect(tech.id).toBe(1);
  });

  test('should add an item', async () => {
    const tech = { name: 'Testing Add' };
    const job = { machine: 'Testing add', complaint: 'testing', tech_id: 1 };
    const [addTech] = await Tech.add(tech);
    const [addJob] = await Job.add(job);

    console.log(addJob);
    expect(addTech.id).toBeDefined();
    expect(addJob.id).toBeDefined();
  });

  test('should update an item', async () => {
    const tech = { name: 'Updating' };
    const job = { machine: 'Updating', complaint: 'Updating', tech_id: 2 };

    const [updateTech] = await Tech.update(1, tech);
    const [updateJob] = await Job.update(1, job);

    console.log(updateTech);
    console.log(updateJob);
  });

  test('should delete an item', async () => {
    const tech = await Tech.remove(2);
    const job = await Job.remove(2);

    console.log(tech);
    console.log(job);
  });
});
