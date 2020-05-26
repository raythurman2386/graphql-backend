import 'dotenv/config';
import jwt from 'jsonwebtoken';

const resetToken = (email: string): string => {
  const payload: PayloadValue = {
    subject: email
  };

  const secret: string = process.env.JWT_SECRET!;

  const options: { expiresIn: string } = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, secret, options);
};

export default resetToken;

interface PayloadValue {
  subject: string;
}
