import 'dotenv/config'
import jwt from 'jsonwebtoken'

const generateToken = (user: UserValues): string => {
  const payload: PayloadValue = {
    subject: user.id
  }

  const secret: string = process.env.JWT_SECRET || 'super-secret-key'

  const options: { expiresIn: string } = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret, options)
}

export default generateToken

interface PayloadValue {
  subject: number;
}

interface UserValues {
  id: number;
  name: string;
}