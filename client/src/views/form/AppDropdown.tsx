import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react'

interface AppDropdownProps extends DropdownProps {
  label: string
  value: boolean | number | string | (boolean | number | string)[]
  optionsArray: (boolean | number | string)[]
  inline?: boolean
  fluid?: boolean
}

export const AppDropdown = ({ label, value, inline, fluid, optionsArray, onChange }: AppDropdownProps) => {
  let className = 'labeled-dropdown';
  if (inline) className += ' inline';
  if (fluid) className += ' fluid';
  let labelClassName = 'ui label';
  if (value !== 'any') labelClassName += ' active';
  return (
    <Form.Field className={className}>
      <div className={labelClassName}>{label}</div>
      <Dropdown labeled selection value={value} onChange={onChange} options={optionsArray.map(name => ({
        key: name, value: name, text: name
      }))} />
    </Form.Field>
  )
}

AppDropdown.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AppDropdown)