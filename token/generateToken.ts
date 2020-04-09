import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import { User } from '../entity/User';

export const generateToken = (user: User): string => {
  return sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '15m'
  });
};

export const generateRefreshToken = (user: User): string => {
  return sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '7d'
  });
};
