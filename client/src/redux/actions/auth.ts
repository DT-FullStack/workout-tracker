import { SignInRequest, RegisterRequest, UserHttp } from '../../api/UserAuth';
import { ActionCreator, AsyncAction, AUTH, WORKOUT } from "./";
import { Action, action } from './index';


export const userApi = new UserHttp();

// type AuthAction<P> = Action<AUTH, P>
// type AuthHandler<P = void> = (payload: P) => AuthAction<P> | AsyncAction | void;
// function action<P>(type: AUTH, payload?: P): AuthAction<P> { return payload ? { type, payload } : { type } };

type AuthAction<P = void> = ActionCreator<AUTH | WORKOUT, P>


export const signOut: AuthAction = () => async (dispatch) => {
  const { data } = await userApi.signOut();
  if (data.success) {
    dispatch(action(AUTH.SIGN_OUT));
  }
}
export const signIn: AuthAction<SignInRequest> = (user) => async (dispatch) => {
  const { data: { success, error, email, id } } = await userApi.signIn(user);
  if (success) {
    dispatch(action(AUTH.SIGN_IN, { email, id }))
  }
}
export const registerUser: AuthAction<RegisterRequest> = (user) => async (dispatch) => {
  const { data: { success, error, email, id } } = await userApi.register(user);
  if (success) dispatch(action(AUTH.REGISTER, { email, id }))

}
export const getToken: AuthAction = () => async (dispatch) => {
  const { data: { success, error, email, id } } = await userApi.getToken();
  if (success) dispatch(action(AUTH.SET_TOKEN, { email, id }))

}

export const clearUserData: AuthAction = () => async dispatch => {
  dispatch(action(WORKOUT.FETCH_HISTORY, []));
}

