import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { Form, Header, Button } from "semantic-ui-react";
import { RootState } from '../../redux/store';
import { registerUser } from '../../redux/actions/auth';

import { RegisterRequest } from '../../api/UserAuth';
import { FormComponent } from '../utils';

interface RegisterProps {
  registerUser: (user: RegisterRequest) => void,
}

// type InputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void

// class Register extends Component<RegisterProps> {
class Register extends FormComponent<RegisterProps, RegisterRequest> {
  state: RegisterRequest = {
    email: '',
    password: '',
    password_confirmation: ''
  };
  error: boolean = false
  submit = () => {
    this.props.registerUser(this.state);
  }

  render = () => {
    const { email, password, password_confirmation } = this.state;
    return (
      <Fragment>
        <Header as="h2">Workout Wizard</Header>
        <Form>
          <Form.Input id="email" onChange={this.update} value={email} name="email" label="Email" type="email" fluid placeholder="your email" />
          <Form.Input id="password" onChange={this.update} value={password} name='password' label='Password' type='password' fluid />
          <Form.Input id="password_confirmation" onChange={this.update} value={password_confirmation} name='password_confirmation' label='Confirm Password' type='password' fluid />
          <Button onClick={this.submit}>Register Your Email</Button>
        </Form>
      </Fragment>
    )
  }
}

const mapStateToProps = (state: RootState) => ({})

export default connect(mapStateToProps, { registerUser })(Register);