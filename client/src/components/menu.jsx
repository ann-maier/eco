import React from 'react';
import { Link } from 'react-router-dom';

import { Login } from './login';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';

export const MenuView = () => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    setUser(sessionStorage.getItem('user'));
  }, []);

  return (
    <Nav className='justify-content-between container'>
      <Nav.Item className='d-flex align-items-center'>
        <Nav.Item>
          <Link to='/'>Home</Link>
        </Nav.Item>
        <NavDropdown title='Карти зображень'>
          <NavDropdown.Item>Вода</NavDropdown.Item>
          <NavDropdown.Item>Атмосфера</NavDropdown.Item>
          <NavDropdown.Item>Земля</NavDropdown.Item>
        </NavDropdown>
      </Nav.Item>
      <Nav.Item>
        {user ? (
          <h1>Welcome, {user}</h1>
        ) : (
          <li>
            <Login setUser={user => setUser(user)} />
          </li>
        )}
      </Nav.Item>
    </Nav>
  );
};
