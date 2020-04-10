import { User, Job, Tech } from './../models/index';
import db from '../data/db-config';

// beforeAll(async () => {
//   await db.seed.run();
// });

describe('Models tests', () => {
  test('should find all items in db', async () => {
    const users = await User.find();

    expect(users).toBeDefined();
  });

  test('should find items by a field', async () => {
    const job = await Job.findBy({ machine: 'test' });
    const tech = await Tech.findBy({ name: 'Herb' });

    expect(job.machine).toBe('test');
    expect(job.id).toBe(1);
  });

  test('should add an item', async () => {
    const tech = { name: 'Testing Add' };
    const [addTech] = await Tech.add(tech);

    expect(addTech.id).toBeDefined();
  });

  test('should update an item', async () => {
    const tech = { name: 'Updating' };

    const [updateTech] = await Tech.update(1, tech);

    console.log(updateTech);
  });

  test('should delete an item', async () => {
    const tech = await Tech.remove(2);

    console.log(tech);
  });
});
