import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const AuthGuard = () => {
  let { authenticated } = useAuth();
  let location = useLocation();
  return authenticated ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace />
}

export default AuthGuard;
