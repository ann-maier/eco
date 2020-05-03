import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Login } from './login';
import Nav from 'react-bootstrap/Nav';
import { Button, NavDropdown } from 'react-bootstrap';
import { useContext } from 'react';
import EnvironmentsInfoContext from './context/environmentsInfoContext';

export const MenuView = ({ user, setUser }) => {
  const history = useHistory();

  const { environmentsInfo, setEnvironmentsInfo } = useContext(
    EnvironmentsInfoContext
  );

  const logOut = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  const selectEnvironment = (selectedId) => {
    const selectedEnvironment = environmentsInfo.environments.find(
      ({ id }) => +selectedId === +id
    );

    setEnvironmentsInfo({
      selected: selectedEnvironment,
      environments: environmentsInfo.environments,
    });

    history.push('/earth');
  };

  return (
    <Nav className='justify-content-between container mt-2 mb-2'>
      <Nav.Item className='d-flex align-items-center'>
        <Nav.Item>
          <Link to='/'>Домашня сторінка</Link>
        </Nav.Item>
        <NavDropdown title='Карти зображень'>
          {environmentsInfo.environments.map(({ id, name }) => (
            <NavDropdown.Item onClick={() => selectEnvironment(id)} key={id}>
              {name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav.Item>
      <Nav.Item>
        {user ? (
          <div className='d-flex align-items-center'>
            <h4 className='mr-2 mb-0'>
              Вітаємо, {user.user_name} ({user.expert_name})
            </h4>
            <Button variant='outline-secondary' size='md' onClick={logOut}>
              Вийти
            </Button>
          </div>
        ) : (
          <Login setUser={setUser} />
        )}
      </Nav.Item>
    </Nav>
  );
};
