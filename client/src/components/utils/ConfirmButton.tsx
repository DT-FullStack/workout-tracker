import React, { useEffect, useRef, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, ButtonProps } from 'semantic-ui-react'

export interface ConfirmButtonProps extends ButtonProps {
  onConfirm: () => void
  rounded?: boolean
}

const ConfirmButton = ({ onConfirm, rounded, style = {}, text, icon, color, content, ...buttonProps }: ConfirmButtonProps) => {
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  if (rounded) style = { ...style, borderRadius: '5px' };
  useEffect(() => {
    // if (active) timerRef.current = setTimeout(() => setActive(false), 5000)
  }, [active, setActive])
  const confirm = () => {
    if (timerRef.current) { clearTimeout(timerRef.current) };
    onConfirm()
  }

  return active
    ? <Button {...buttonProps} onClick={confirm} style={style} className='fade-in-short' basic={false} color={color} content={content} />
    : <Button {...buttonProps} icon={icon} onClick={() => setActive(true)} />

}

export default ConfirmButton