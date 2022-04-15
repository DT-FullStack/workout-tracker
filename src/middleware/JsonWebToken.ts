import { env } from 'process';
import * as jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import { RequestHandler } from 'express';
import { User } from '../../client/src/models/User';
import { secret } from '../routers/AuthRouter';


// const secret = env.APP_SECRET || 'development'

export const jwtSign = (data: string | object | Buffer): string => {
  return jwt.sign(data, secret(), { expiresIn: 86400 })
}
export const jwtAuthToken = ({ id, email }: User): string => {
  return jwt.sign({ id, email }, secret());
}

export const jwtRequireAuth: RequestHandler = (req, res, next) => {
  let token = req.headers['x-access-token'] || cookieParser.signedCookie(req.signedCookies['X-ACCESS-TOKEN'], secret())
  if (!token) {
    return res.status(403).send({ error: { token: 'Not provided' } })
  }
  else if (typeof token === 'object') token = token.join();

  jwt.verify(token, secret(), (err, decoded) => {
    if (err || !decoded || typeof decoded === 'string') return res.status(401).json({ error: { token: 'Unauthorized' } })
    req.userId = decoded.id;
    next();
  })
}
export const jwtUserMatch: RequestHandler = (req, res, next) => {
  const { userId: tokenId } = req;
  const { userId: requestId } = req.params;
  if (tokenId !== requestId) res.status(401).json({ error: { token: 'Token mismatch' } })
  next();
}

export const jwtVerifyToken = (token: string) => {
  return jwt.verify(token, secret());
}