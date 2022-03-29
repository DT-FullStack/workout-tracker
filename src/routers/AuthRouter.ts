import { Request, RequestHandler, Response, Router } from "express";
import User from '../schemas/User';
import { jwtAuthToken, jwtSign, jwtVerifyToken } from '../middleware/JsonWebToken';
import asyncCatch from "../utils/asyncCatch";

const authRouter = Router();

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
  // @ts-ignore
  // const token = jwtAuthToken({ id: 'asf', email: 'doctordeetz@gmail.com' });
  // res.json({ success: true, email: 'doctordeetz@gmail.com', accessToken: token })
  const user = await User.findAndValidate(email, password);
  if (user) {
    const token = jwtAuthToken(user);
    res.json({ success: true, email: user.email, accessToken: token })
  } else res.json({ error: { credentials: 'Invalid Credentials' } })
}
authRouter.post('/signin', asyncCatch(signIn));


authRouter.get('/signout', (req: Request, res: Response) => {
  res.json({ success: true })
})


const getToken = async (req: Request, res: Response) => {
  let accessToken = req.headers['x-access-token'];
  if (!accessToken) res.json({ accessToken: null });
  else {
    if (typeof accessToken === 'object') accessToken = accessToken.join();
    const result = jwtVerifyToken(accessToken) as { id: string, email: string }
    const { id, email } = result;
    res.json({ accessToken, success: true, email, id })
  }
}
authRouter.get('/getToken', asyncCatch(getToken))

export default authRouter;