import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { clearUserData } from 'redux/actions/auth';
import { RootState } from 'redux/store';
import { useAuth } from './AuthContext';

const mapStateToProps = ({ workout, auth }: RootState) => ({})
const mapDispatchToProps = { clearUserData }
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthGuard = ({ clearUserData }: PropsFromRedux) => {
  let { authenticated } = useAuth();
  let location = useLocation();
  useEffect(() => {
    if (!authenticated) clearUserData();
    return () => { clearUserData() }
  }, [authenticated])
  return authenticated ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace />
}

export default connector(AuthGuard);