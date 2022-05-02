import React, { useEffect, useRef, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, ButtonProps } from 'semantic-ui-react'
import { ButtonLink } from '../nav/ButtonLink';

export interface ConfirmLinkProps extends ButtonProps {
  to: string
  rounded?: boolean
  onConfirm?: () => void
}

const ConfirmLink = ({ onConfirm = () => { }, rounded, style = {}, text, icon, color, content, to, ...buttonProps }: ConfirmLinkProps) => {
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  if (rounded) style = { ...style, borderRadius: '5px' };
  useEffect(() => {
    if (active) timerRef.current = setTimeout(() => setActive(false), 5000)
  }, [active, setActive])
  const confirm = () => {
    if (timerRef.current) { clearTimeout(timerRef.current) };
    onConfirm()
  }

  return active
    ? <ButtonLink {...buttonProps} to={to} onClick={confirm} style={style} className='fade-in-short' basic={false} color={color} content={content} />
    : <Button {...buttonProps} icon={icon} onClick={() => setActive(true)} />

}

export default ConfirmLink