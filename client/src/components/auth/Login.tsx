import React, { Component } from 'react'
import { FormComponent } from '../utils'
import { signIn } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { SignInRequest } from '../../api/UserAuth';
import { RootState } from '../../redux/store';
import { Form, Header } from 'semantic-ui-react';

interface SignInProps {
  signIn: (req: SignInRequest) => void
}

class Login extends FormComponent<SignInProps, SignInRequest>{
  state: SignInRequest = {
    email: '',
    password: ''
  }

  submit = async () => {
    this.props.signIn(this.state);
  }

  render = () => {
    const { email, password } = this.state;
    return (
      <React.Fragment>
        <Header as="h1">Sign In</Header>
        <Form>
          <Form.Input id="email" onChange={this.update} value={email} name="email" label="Email" type="email" fluid placeholder="Your email" />
          <Form.Input id="password" onChange={this.update} value={password} name='password' label='Password' type='password' fluid />
          <Form.Button color="blue" onClick={this.submit}>submit</Form.Button>
        </Form>

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: RootState) => ({})

export default connect(mapStateToProps, { signIn })(Login)
