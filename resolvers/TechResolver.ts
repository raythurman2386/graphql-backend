import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Tech } from '../entity/Tech';

@Resolver()
export class TechResolver {
  @Query(() => [Tech])
  techs(): Promise<Tech[]> {
    return Tech.find({ relations: ['jobs'] });
  }

  @Query(() => Tech)
  tech(@Arg('id') id: number) {
    return Tech.findOne(id, { relations: ['jobs'] });
  }

  @Mutation(() => Tech)
  async addTech(@Arg('name') name: string) {
    try {
      const newTech = await Tech.insert({
        name
      });

      const tech = await Tech.findOne(newTech.raw[0].id, {
        relations: ['jobs']
      });

      return tech;
    } catch (err) {
      throw new Error('There has been a problem');
    }
  }

  @Mutation(() => String)
  async updateTech(
    @Arg('id') id: number,
    @Arg('name') name: string
  ): Promise<string> {
    try {
      await Tech.update(id, {
        name
      });

      return 'Tech updated successfully';
    } catch (err) {
      throw new Error('There has been a problem');
    }
  }

  @Mutation(() => String)
  async deleteTech(@Arg('id') id: number): Promise<string> {
    try {
      await Tech.delete(id);

      return 'Tech deleted successfully';
    } catch (err) {
      throw new Error('There has been a problem');
    }
  }
}
