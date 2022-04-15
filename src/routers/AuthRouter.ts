import { CookieOptions, Request, RequestHandler, Response, Router } from "express";
import User from '../schemas/User';
import { jwtAuthToken, jwtSign, jwtVerifyToken } from '../middleware/JsonWebToken';
import asyncCatch from "../utils/asyncCatch";
import cookieParser from 'cookie-parser';
import { env } from 'process';

const authRouter = Router();

export const secret = () => env.APP_SECRET || 'development';

const addCookieToResponse = (token: string, res: Response): void => {
  const options: CookieOptions = {
    httpOnly: true,
    sameSite: true,
    // secure: true,
    signed: true,
    maxAge: 60 * 1000 * 60
  };
  if (env.NODE_ENV !== 'production') options.domain = 'localhost';
  res.cookie('X-ACCESS-TOKEN', token, options);
}
const removeCookie = (res: Response) => {
  res.cookie('X-ACCESS-TOKEN', null, {
    httpOnly: true,
    sameSite: true,
    secure: true,
    signed: true,
    maxAge: 0
  })
}

interface RegisterRequest extends Request {
  body: {
    email: string
    password: string
    password_confirmation: string
  }
}
const register: RequestHandler = async (req: RegisterRequest, res: Response) => {
  const { email, password, password_confirmation } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.json({ error: { email: 'Email already exists' } });
  } else if (password !== password_confirmation) {
    res.json({ error: { password_confirmation: 'Passwords do not match', } })
  } else {
    const user = await User.create({ email, password });
    const token = jwtAuthToken(user);
    res.json({ success: true, email: user.email, accessToken: token })
  }
}
authRouter.post('/register', asyncCatch(register))


interface SignInRequest extends Request {
  body: {
    email: string;
    password: string;
  }
}
const signIn: RequestHandler = async (req: SignInRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findAndValidate(email, password);
  if (user) {
    const token = jwtAuthToken(user);
    addCookieToResponse(token, res);
    res.json({ success: true, id: user.id, email: user.email })
  } else {
    removeCookie(res);
    res.status(400).json({ error: { credentials: 'Invalid Credentials' } })
  }
}
authRouter.post('/signin', asyncCatch(signIn));


authRouter.get('/signout', (req: Request, res: Response) => {
  removeCookie(res);
  res.json({ success: true })
})


const getToken = async (req: Request, res: Response) => {
  let token = req.headers['x-access-token'] || cookieParser.signedCookie(req.signedCookies['X-ACCESS-TOKEN'], secret())
  if (!token) res.json({ token: null });
  else {
    if (typeof token === 'object') token = token.join();
    const result = jwtVerifyToken(token) as { id: string, email: string }
    const { id, email } = result;
    res.json({ success: true, email, id })
  }
}
authRouter.get('/getToken', asyncCatch(getToken))

export default authRouter;