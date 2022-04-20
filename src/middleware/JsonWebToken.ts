import { env } from 'process';
import * as jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import { CookieOptions, RequestHandler, Response } from 'express';
import { User } from '../../client/src/models/User';

export const secret = () => env.APP_SECRET || 'development';

export const jwtSign = (data: string | object | Buffer): string => {
  return jwt.sign(data, secret(), { expiresIn: 86400 })
}
export const jwtAuthToken = ({ id, email }: User): string => {
  return jwt.sign({ id, email }, secret());
}

export const setNewAuthCookie = (token: string, res: Response): void => {
  const options: CookieOptions = {
    httpOnly: true,
    sameSite: true,
    signed: true,
    maxAge: 60 * 1000 * 60
  };
  if (env.NODE_ENV !== 'production') options.domain = 'localhost';
  res.cookie('X-ACCESS-TOKEN', token, options);
}
export const revokeAuthCookie = (res: Response) => {
  res.cookie('X-ACCESS-TOKEN', null, {
    httpOnly: true,
    sameSite: true,
    secure: true,
    signed: true,
    maxAge: 0
  })
}

export const jwtRequireAuth: RequestHandler = (req, res, next) => {
  let token = cookieParser.signedCookie(req.signedCookies['X-ACCESS-TOKEN'], secret())
  if (typeof token !== 'string') {
    revokeAuthCookie(res);
    return res.status(403).send({ error: { token: 'Not provided' } })
  } else {
    jwt.verify(token, secret(), (err, decoded) => {
      if (err || !decoded || typeof decoded === 'string') return res.status(401).json({ error: { token: 'Unauthorized' } })
      req.userId = decoded.id;
      setNewAuthCookie(token as string, res);
      next();
    })
  }
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

// export const setNewAuthCookie:RequestHandler = (req, res, next) => {
  
// }