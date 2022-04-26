import React, { Component, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, InputOnChangeData, Message, MessageProps, } from 'semantic-ui-react'
import AppExponentialChange, { ExponentialChangeI } from 'components/utils/AppExponentialChange'
// import ClickNHold from 'react-click-n-hold';
import ClickNHold from './AppClickNHold'
import FadingMessage from 'components/utils/FadingMessage'

export type AppNumberChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void


interface AppNumberProps {
  value?: number
  setValue?: (value: number) => void
  textAlign?: 'left' | 'right' | 'center'
  leftLabel?: string
  rightLabel?: string
  info?: string | JSX.Element
  options?: Partial<ExponentialChangeI>
}

const AppNumber = (props: AppNumberProps) => {
  const { value, setValue, leftLabel, rightLabel, textAlign, options, info } = props;
  const [error, setError] = useState<string | null>(null);

  const change = useRef(new AppExponentialChange({
    initial: 5,
    value,
    setValue,
    onError: (changeError) => { setError(changeError) },
    ...options
  }));

  const label = (text: string) => <span className='label'>{text}</span>;
  const className = textAlign ? `app number ${textAlign}` : 'app number';

  useEffect(() => {
    change.current.toInitial()
  }, [])

  return (
    <div className={className} onMouseUp={change.current.stop} onTouchEnd={change.current.stop}    >
      <Button icon="minus" size='tiny' onMouseDown={() => change.current.start('down')} onTouchStart={() => change.current.start('down')} />
      <div className="text">
        {leftLabel && label(leftLabel)}
        <div className="value">{change.current.displayValue}</div>
        {rightLabel && label(rightLabel)}
        <div className="info">
          {info}
          {error && <FadingMessage negative content={error} />}
        </div>
      </div>
      <Button icon="plus" size='tiny' onMouseDown={() => change.current.start('up')} onTouchStart={() => change.current.start('up')} />
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AppNumber)