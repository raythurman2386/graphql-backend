import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx
} from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { User } from '../entity/User';
import { generateToken, generateRefreshToken } from '../token/generateToken';
import { MyContext } from '../context/Context';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: String;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'Hi!';
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPass = await hash(password, 12);

    try {
      await User.insert({
        name,
        email,
        password: hashedPass
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Could not find user');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid password');
    }

    // Login Success
    res.cookie('jid', generateRefreshToken(user), { httpOnly: true });

    return {
      accessToken: generateToken(user)
    };
  }
}
