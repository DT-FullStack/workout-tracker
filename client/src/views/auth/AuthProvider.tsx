import React from 'react'
import { connect } from 'react-redux'
import { AuthState } from 'redux/reducers/Auth'
import { RootState } from 'redux/store'
import { AuthContext } from './AuthContext'
import { getToken } from '../../redux/actions/auth';

interface AuthProviderProps {
  auth: AuthState
  children: React.ReactNode
  getToken(): any
}

export const AuthProvider = ({ auth, children, getToken }: AuthProviderProps) => {
  const { authenticated, token } = auth;
  if (token && !authenticated) getToken();
  return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
})

const mapDispatchToProps = { getToken }

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider)