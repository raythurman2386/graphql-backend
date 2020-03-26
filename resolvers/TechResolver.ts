import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Tech } from '../entity/Tech';

@Resolver()
export class TechResolver {
  @Query(() => [Tech])
  techs() {
    return Tech.find({ relations: ['jobs'] });
  }

  @Query(() => Tech)
  tech(@Arg('id') id: number) {
    return Tech.findOne(id, { relations: ['jobs'] });
  }

  @Mutation(() => String)
  async addTech(@Arg('name') name: string) {
    try {
      await Tech.insert({
        name
      });

      return 'Tech added successfully';
    } catch (err) {
      throw new Error('There has been a problem');
    }
  }

  @Mutation(() => String)
  async updateTech(@Arg('id') id: number, @Arg('name') name: string) {
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
  async deleteTech(@Arg('id') id: number) {
    try {
      await Tech.delete(id);

      return 'Tech deleted successfully';
    } catch (err) {
      throw new Error('There has been a problem');
    }
  }
}
