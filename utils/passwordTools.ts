import { hash, compare } from 'bcryptjs';

export const hashPassword = (password: string): Promise<string> =>
  hash(password, 12);

export const comparePassword = async (
  inputPass: string,
  dbPass: string
): Promise<boolean> => {
  const valid = await compare(inputPass, dbPass);
  if (!valid) {
    throw new Error('Passwords do not match');
  }

  return true;
};
