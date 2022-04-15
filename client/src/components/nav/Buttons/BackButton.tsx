import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

interface BackButtonProps {

}

export const BackButton = (props: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button icon onClick={() => navigate(-1)}>
      <Icon name="arrow left" />
    </Button>
  )
}

BackButton.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BackButton)