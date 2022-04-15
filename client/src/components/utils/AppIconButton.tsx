import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Icon, IconProps } from 'semantic-ui-react'

interface IconButtonProps extends IconProps {
  onClick?: React.MouseEventHandler
  text?: string
  className?: string
}

export const IconButton = (props: IconButtonProps) => {
  const { name, onClick, className, text } = props;
  return (
    <Button icon className={className} onClick={onClick}>
      <Icon name={name} />

      {text && <span>{text}</span>}
    </Button>
  )
}

IconButton.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(IconButton)