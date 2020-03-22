import { User } from '../models';

export const checkUser = async (user: { email: any; password?: string }) => {
  const findUser = await User.findBy({ email: user.email });

  if (findUser) {
    throw new Error('User already exists');
  }

  return;
};
