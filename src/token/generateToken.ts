require('dotenv').config()
import jwt from 'jsonwebtoken'

const generateToken = (user: { id: number; username: string }) => {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const secret = 'as;ldkf;a;fqwiefpoandiaushdliaudiuwelaf/asdfiahspda'

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret, options)
}

export default generateToken
