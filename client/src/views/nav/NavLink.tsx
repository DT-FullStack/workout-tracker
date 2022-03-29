import { Link } from 'react-router-dom';
import { MenuItem, MenuItemProps } from 'semantic-ui-react'
import _ from 'lodash'

interface NavLinkProps extends MenuItemProps {
  to: string
  name: string
}

class NavLink extends MenuItem {
  constructor(props: NavLinkProps) {
    super(props);
    const { to, name } = props;
    this.state = { to, name };
  }
  displayName = () => _.startCase(_.camelCase(this.props.name))
  render = () => {
    const { to, name } = this.state;
    return (
      <MenuItem>
        <Link to={to}>{name ? this.displayName() : this.props.children}</Link>
      </MenuItem>

    )
  }
}

export default NavLink;

// const NavLink = ({ to,text }: NavLinkProps) => {
//   return (
//     <MenuItem>
//       <Link to={to}>{text}</Link>
//     </MenuItem>
//   )
// }