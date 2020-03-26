import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Tech } from '../entity/Tech';

@Resolver()
export class TechResolver {
  @Query(() => [Tech])
  techs() {
    return Tech.find();
  }

  @Query(() => Tech)
  tech(@Arg('id') id: number) {
    return Tech.findOne(id);
  }

  @Mutation(() => String)
  async addTech(@Arg('name') name: string) {
    try {
      await Tech.insert({
        name
      });

      return "Tech added successfully"
    } catch (err) {
      throw new Error('There has been a problem');
    }
  }
}
