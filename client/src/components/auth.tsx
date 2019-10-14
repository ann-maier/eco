import React from 'react';

import { post } from '../utils/httpService';
import { LOGIN_URL } from '../utils/constants';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export const Auth = (props: any) => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginUser = () => {
    post(LOGIN_URL, { login, password }).then(({ data }) => {
      alert(`Logged: ${data.success}`);
      if (!!data.success) {
        props.onHide();
      }
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter username"
                value={login}
                onChange={(e: any) => setLogin(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={loginUser}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
