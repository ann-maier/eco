import React from 'react';
import { Link } from 'react-router-dom';

import { Login } from './login';
import Nav from 'react-bootstrap/Nav';
import { Button, NavDropdown } from 'react-bootstrap';

export const MenuView = ({ user, setUser }) => {
  const logOut = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
    <Nav className='justify-content-between container mt-2 mb-2'>
      <Nav.Item className='d-flex align-items-center'>
        <Nav.Item>
          <Link to='/'>Домашня сторінка</Link>
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
          <div className='d-flex align-items-center'>
            <h4 className='mr-2 mb-0'>Вітаємо, {user.user_name} ({user.expert_name})</h4>
            <Button variant='outline-secondary' size='md' onClick={logOut}>Вийти</Button>
          </div>

        ) : (
            <Login setUser={setUser} />
          )}
      </Nav.Item>
    </Nav>
  );
};
