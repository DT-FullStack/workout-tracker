import { AUTH } from "../actions"
import { Reducer } from "redux";
// import { BrowserRouter as Router } from 'react-router-dom';

const storage = window.localStorage;

export interface AuthState {
  authenticated: boolean | null,
  email: string | null
  token: string | null
}
export const initial: AuthState = {
  authenticated: null,
  email: null,
  token: storage.getItem('accessToken') || null
}


const authReducer: Reducer<AuthState> = (state = initial, { type, payload = {} }) => {
  if (payload === null) return state;
  const { email, accessToken: token } = payload;
  switch (type) {
    case AUTH.SIGN_OUT:
      storage.removeItem('accessToken');
      return { ...state, authenticated: false, email: null, token: null }
    case AUTH.SIGN_IN:
      return { ...state, authenticated: true, email, token }
    case AUTH.REGISTER:
      return { ...state, authenticated: true, email, token }
    case AUTH.SET_TOKEN:
      return { ...state, authenticated: true, email, token }
    default:
      return state;
  }
}

export default authReducer;