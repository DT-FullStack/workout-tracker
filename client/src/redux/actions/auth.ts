import { SignInRequest, RegisterRequest, UserHttp } from '../../api/UserAuth';
import { AsyncAction, AUTH } from "./";
import { Action } from './index';


export const userApi = new UserHttp();

type AuthAction<P> = Action<AUTH, P>
type AuthHandler<P = void> = (payload: P) => AuthAction<P> | AsyncAction | void;
function action<P>(type: AUTH, payload?: P): AuthAction<P> { return payload ? { type, payload } : { type } };


export const signOut: AuthHandler = () => async (dispatch) => {
  const { data: { success } } = await userApi.signOut();
  if (success) dispatch(action(AUTH.SIGN_OUT));
}
export const signIn: AuthHandler<SignInRequest> = (user) => async (dispatch) => {
  const { data: { success, error, accessToken, email, id } } = await userApi.signIn(user);
  if (success) {
    dispatch(action(AUTH.SIGN_IN, { email, id, accessToken }))
  } else console.error(error);
}
export const registerUser: AuthHandler<RegisterRequest> = (user) => async (dispatch) => {
  const { data: { success, error, accessToken, email, id } } = await userApi.register(user);
  if (success) dispatch(action(AUTH.REGISTER, { email, id, accessToken }))
  else console.error(error);
}
export const getToken: AuthHandler = () => async (dispatch) => {
  const { data: { success, error, accessToken, email, id } } = await userApi.getToken();
  if (success) dispatch(action(AUTH.SET_TOKEN, { email, id, accessToken }))
  else console.error(error);
}

