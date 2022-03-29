import React from "react";
import { AuthState, initial as InitialAuth } from "redux/reducers/Auth";

export const AuthContext = React.createContext<AuthState>(InitialAuth);
export const useAuth = () => React.useContext(AuthContext);