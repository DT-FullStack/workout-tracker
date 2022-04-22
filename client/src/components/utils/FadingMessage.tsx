import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Message, MessageProps } from 'semantic-ui-react'

const mapStateToProps = (state: RootState) => ({})
const mapDispatchToProps = {}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

interface FadingMessageProps extends PropsFromRedux, MessageProps {
  delay?: 'none' | 'short' | 'medium' | 'long' | 'extended'
  fadeLength?: 'short' | 'medium' | 'long' | 'extra-long'
}

const FadingMessage = ({ delay = 'short', fadeLength = 'medium', ...messageProps }: FadingMessageProps) => {
  return (
    <Message className={`fade-out-${fadeLength} delay-${delay}`} {...messageProps} />
  )
}

export default connector(FadingMessage)