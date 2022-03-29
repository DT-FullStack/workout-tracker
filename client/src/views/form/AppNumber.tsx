import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, InputOnChangeData, } from 'semantic-ui-react'
import AppExponentialChange, { ExponentialChangeI } from 'views/utils/AppExponentialChange'
// import ClickNHold from './AppClickNHold'

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
  const change: AppExponentialChange = new AppExponentialChange({
    initial: 5,
    value,
    setValue,
    ...options
  });

  const label = (text: string) => <span className='label'>{text}</span>;
  const className = textAlign ? `app number ${textAlign}` : 'app number';

  useEffect(() => {
    change.toInitial()
  }, [])

  return (
    <div className={className} >
      <Button icon="minus" size='tiny' onClick={() => { change.direction = 'down'; change.adjust() }} />
      {leftLabel && label(leftLabel)}
      <div className="value">{change.displayValue}</div>
      {rightLabel && label(rightLabel)}
      <Button icon="plus" size='tiny' onClick={() => { change.direction = 'up'; change.adjust() }} />
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