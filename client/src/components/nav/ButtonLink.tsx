import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from 'redux/store'
import { Button, ButtonProps } from 'semantic-ui-react'

interface ButtonLinkProps extends ButtonProps {
  to: string
}

export const ButtonLink = (props: ButtonLinkProps) => {
  const { to, ...buttonProps } = props;
  return (
    <Link to={to} className="button-link">
      <Button {...buttonProps} />
    </Link>
  )
}

ButtonLink.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLink)