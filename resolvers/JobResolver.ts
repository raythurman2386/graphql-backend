import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { Job } from '../entity/Jobs';
import { Tech } from '../entity/Tech';

@Resolver()
export class JobResolver {
  @Query(() => [Job])
  jobs(): Promise<Job[]> {
    return Job.find({ relations: ['tech'] });
  }

  @Query(() => Job)
  job(@Arg('id') id: number) {
    return Job.findOne(id, { relations: ['tech'] });
  }

  @Mutation(() => Job)
  async addJob(
    @Arg('machine') machine: string,
    @Arg('complaint') complaint: string,
    @Arg('tech') tech: string
  ) {
    try {
      const jobTech = await Tech.findOne({ where: { name: tech } });

      const newJob = await Job.insert({
        machine,
        complaint,
        tech: jobTech
      });

      const job = await Job.findOne(newJob.raw[0].id, { relations: ['tech'] });

      return job;
    } catch (err) {
      throw new Error('There has been a problem');
    }
  }

  @Mutation(() => String)
  async updateJob(
    @Arg('id') id: number,
    @Arg('machine') machine: string,
    @Arg('complaint') complaint: string,
    @Arg('tech') tech: string
  ): Promise<string> {
    try {
      const jobTech = await Tech.findOne({ where: { name: tech } });

      await Job.update(id, {
        machine,
        complaint,
        tech: jobTech
      });

      return 'Job updated successfully';
    } catch (err) {
      throw new Error('There has been a problem');
    }
  }

  @Mutation(() => String)
  async deleteJob(@Arg('id') id: number): Promise<string> {
    try {
      await Job.delete(id);

      return 'Job deleted successfully';
    } catch (err) {
      throw new Error('There has been a problem');
    }
  }
}
