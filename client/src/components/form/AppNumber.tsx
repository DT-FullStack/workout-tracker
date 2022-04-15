import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, InputOnChangeData, } from 'semantic-ui-react'
import AppExponentialChange, { ExponentialChangeI } from 'components/utils/AppExponentialChange'
// import ClickNHold from 'react-click-n-hold';
import ClickNHold from './AppClickNHold'

export type AppNumberChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void


interface AppNumberProps {
  value?: number
  setValue?: (value: number) => void
  textAlign?: 'left' | 'right' | 'center'
  leftLabel?: string
  rightLabel?: string
  options?: Partial<ExponentialChangeI>
}

const AppNumber = (props: AppNumberProps) => {
  const { value, setValue, leftLabel, rightLabel, textAlign, options } = props;
  const change = useRef(new AppExponentialChange({
    initial: 5,
    value,
    setValue,
    ...options
  }));

  const label = (text: string) => <span className='label'>{text}</span>;
  const className = textAlign ? `app number ${textAlign}` : 'app number';

  useEffect(() => {
    change.current.toInitial()
  }, [])

  return (
    <div className={className} onMouseUp={change.current.stop} onTouchEnd={change.current.stop}    >
      <Button icon="minus" size='tiny' onMouseDown={() => change.current.start('down')} />
      {leftLabel && label(leftLabel)}
      <div className="value">{change.current.displayValue}</div>
      {rightLabel && label(rightLabel)}
      <Button icon="plus" size='tiny' onMouseDown={() => change.current.start('up')} />
    </div>
  )
}

AppNumber.propTypes = {
  // second: PropTypes.
}

AppNumber.defaultProps = {

}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AppNumber)