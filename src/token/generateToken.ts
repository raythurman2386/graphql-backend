import jwt from 'jsonwebtoken'

const generateToken = (user: { id: number; username: string }) => {
  const payload: { subject: number; username: string } = {
    subject: user.id,
    username: user.username
  }

  const secret: string = 'this-is-just-a-test-string'

  const options: { expiresIn: string } = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret, options)
}

export default generateToken
