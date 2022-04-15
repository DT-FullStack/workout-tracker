import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { AuthContext } from './AuthContext'
import { getToken } from '../../redux/actions/auth';

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
})

const mapDispatchToProps = { getToken }

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface AuthProviderProps extends PropsFromRedux {
  children: React.ReactNode
}

export const AuthProvider = ({ auth, children, getToken }: AuthProviderProps) => {
  const { authenticated, token } = auth;
  if (token && !authenticated) getToken();
  return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>
}


export default connector(AuthProvider)