import 'dotenv/config'
import jwt from 'jsonwebtoken'

const generateToken = (user: { id: number; username: string }) => {
  const payload: { subject: number; username: string } = {
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
