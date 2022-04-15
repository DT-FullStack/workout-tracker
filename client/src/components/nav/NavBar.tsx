import React, { useState } from 'react'
import { Menu, MenuItemProps } from 'semantic-ui-react'
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/store';
import NavLink from './NavLink';
import { signOut } from '../../redux/actions/auth';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.authenticated
})
const mapDispatchToProps = { signOut }

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>


interface NavState extends PropsFromRedux {
  active?: string
}
type ClickHandler = (event: React.MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => void

const NavBar = ({ isAuthenticated, active, signOut }: NavState) => {
  const [activeItem, setActiveItem] = useState(active);
  const onClick: ClickHandler = (ev, { name }) => setActiveItem(name)

  return (
    <Menu>
      <NavLink to="/"><b>WorkOut Wizard</b></NavLink>
      {isAuthenticated ? (
        <Menu.Menu position='right'>
          <Menu.Item name="signOut" active={activeItem === 'signOut'} onClick={() => signOut()} />
        </Menu.Menu>
      ) : (
        <Menu.Menu position='right'>
          <NavLink to="/signin" name="signIn" active={activeItem === 'signIn'} onClick={onClick} />
          <NavLink to="/register" name="register" active={activeItem === 'register'} onClick={onClick} />
        </Menu.Menu>
      )}
    </Menu>
  )
}

export default connector(NavBar)