import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { Job } from '../entity/Jobs';
import { Tech } from '../entity/Tech';

@Resolver()
export class JobResolver {
  @Query(() => [Job])
  jobs() {
    return Job.find({ relations: ['tech'] });
  }

  @Query(() => Job)
  job(@Arg('id') id: number) {
    return Job.findOne(id, { relations: ['tech'] });
  }

  @Mutation(() => String)
  async addJob(
    @Arg('machine') machine: string,
    @Arg('complaint') complaint: string,
    @Arg('tech') tech: string
  ) {
    try {
      const jobTech = await Tech.findOne({ where: { name: tech } });

      await Job.insert({
        machine,
        complaint,
        tech: jobTech
      });

      return 'Job added successfully';
    } catch (err) {
      throw new Error('There has been a problem');
    }
  }
}