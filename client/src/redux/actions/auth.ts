import { SignInRequest, RegisterRequest, UserHttp } from '../../api/UserAuth';
import { AUTH } from "./";
import { AppDispatch } from "../store";
import { action } from './index';


export const userApi = new UserHttp();

export const signOut = () => async (dispatch: AppDispatch) => {
  const { data: { success } } = await userApi.signOut();
  if (success) dispatch(action(AUTH.SIGN_OUT));
}
export const signIn = (user: SignInRequest) => async (dispatch: AppDispatch) => {
  const { data: { success, error, accessToken, email } } = await userApi.signIn(user);
  if (success) {
    dispatch(action(AUTH.SIGN_IN, { email, accessToken }))
  } else console.error(error);
}
export const registerUser = (user: RegisterRequest) => async (dispatch: AppDispatch) => {
  const { data: { success, error, accessToken, email } } = await userApi.register(user);
  if (success) dispatch(action(AUTH.REGISTER, { email, accessToken }))
  else console.error(error);
}
export const getToken = () => async (dispatch: AppDispatch) => {
  const { data: { success, error, accessToken, email } } = await userApi.getToken();
  if (success) dispatch(action(AUTH.SET_TOKEN, { email, accessToken }))
  else console.error(error);
}

