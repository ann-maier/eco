import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { post } from '../utils/httpService';
import { LOGIN_URL } from '../utils/constants';

export class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: ''
    };

    this.loginUser = this.loginUser.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  setLogin(e) {
    this.setState({ login: e.target.value });
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

  loginUser() {
    post(LOGIN_URL, {
      login: this.state.login,
      password: this.state.password
    }).then(({ data }) => {
      alert(`Logged: ${data.success}`);
      if (data.success) {
        this.props.onHide();
        this.props.setUser(this.state.login);
        sessionStorage.setItem('user', this.state.login);
      }
    });
  }

  render() {
    return (
      <Container>
        <Row className='justify-content-center'>
          <Col xs={6}>
            <Form>
              <Form.Group controlId='formUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='input'
                  placeholder='Enter username'
                  value={this.login}
                  onChange={this.setLogin}
                />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={this.password}
                  onChange={this.setPassword}
                />
              </Form.Group>
              <Button variant='primary' onClick={this.loginUser}>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
