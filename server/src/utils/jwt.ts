import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import { config } from '../config'
import { Role } from '../types'

export interface JwtPayload {
  sub: string
  role: Role
}

export const signToken = (userId: string, role: Role) => {
  const payload: JwtPayload = { sub: userId, role }
  const secret: Secret = config.jwtSecret as Secret
  const opts: SignOptions = { ...(config.jwtExpiresIn ? { expiresIn: config.jwtExpiresIn as unknown as SignOptions['expiresIn'] } : {}) }
  return jwt.sign(payload, secret, opts)
}

export const verifyToken = (token: string) => {
  const secret: Secret = config.jwtSecret as Secret
  return jwt.verify(token, secret) as JwtPayload
}
