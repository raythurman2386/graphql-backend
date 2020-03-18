import 'dotenv/config'
import jwt from 'jsonwebtoken'

const generateToken = (user: UserValues): string => {
  const payload: PayloadValue = {
    subject: user.id,
    username: user.username
  }

  const secret: any = process.env.JWT_SECRET

  const options: { expiresIn: string } = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret, options)
}

export default generateToken

interface PayloadValue {
  subject: number;
  username: string;
}

interface UserValues {
  id: number;
  username: string;
}