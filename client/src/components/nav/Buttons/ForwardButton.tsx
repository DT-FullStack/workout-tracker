import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'redux/store'
import { Button, Icon } from 'semantic-ui-react'

interface ForwardButtonProps {

}

export const ForwardButton = (props: ForwardButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button icon onClick={() => navigate(1)}>
      <Icon name="arrow right" />
    </Button>
  )
}

ForwardButton.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ForwardButton)