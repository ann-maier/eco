import React from 'react';
import { Link } from 'react-router-dom';

import { Login } from './login';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';

export const MenuView = ({ user, setUser }) => {
  return (
    <Nav className='justify-content-between container mt-2 mb-2'>
      <Nav.Item className='d-flex align-items-center'>
        <Nav.Item>
          <Link to='/'>Home</Link>
        </Nav.Item>
        <NavDropdown title='Карти зображень'>
          <NavDropdown.Item>Вода</NavDropdown.Item>
          <NavDropdown.Item>Атмосфера</NavDropdown.Item>
          <NavDropdown.Item>
            <Link to='/earth'>Земля</Link>
          </NavDropdown.Item>
        </NavDropdown>
      </Nav.Item>
      <Nav.Item>
        {user ? (
          <h1>Welcome, {user.name}</h1>
        ) : (
            <Login setUser={setUser} />
          )}
      </Nav.Item>
    </Nav>
  );
};
