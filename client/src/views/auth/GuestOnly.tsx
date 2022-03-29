import React from 'react'
import { Location, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';


export const GuestOnly = () => {
  let { authenticated } = useAuth();
  return !authenticated ? <Outlet /> : <Navigate to="/dashboard" />
}

export default GuestOnly;
