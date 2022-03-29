import React, { Component } from 'react'
import { Menu, MenuItemProps } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import NavLink from './NavLink';
import { signOut } from '../../redux/actions/auth';


interface NavState {
  active?: string
  isAuthenticated: boolean | null
  signOut?: () => {}
}
type ClickHandler = (event: React.MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => void

class NavBar extends Component<NavState> {
  state: NavState = { isAuthenticated: false }
  onClick: ClickHandler = (ev, { name }) => this.setState({ active: name })
  render() {
    const { isAuthenticated, signOut } = this.props;
    const activeItem = this.state.active;
    return (
      <Menu>
        <NavLink to="/"><b>WorkOut Wizard</b></NavLink>
        {isAuthenticated ? (
          <Menu.Menu position='right'>
            <Menu.Item name="signOut" active={activeItem === 'signOut'} onClick={signOut} />
          </Menu.Menu>
        ) : (
          <Menu.Menu position='right'>
            <NavLink to="/signin" name="signIn" active={activeItem === 'signIn'} onClick={this.onClick} />
            <NavLink to="/register" name="register" active={activeItem === 'register'} onClick={this.onClick} />
          </Menu.Menu>
        )}
      </Menu>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.authenticated
})

export default connect(mapStateToProps, { signOut })(NavBar)