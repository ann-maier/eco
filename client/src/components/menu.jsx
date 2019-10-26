import React from 'react';
import { Link } from 'react-router-dom';

import { Login } from './login';

export const MenuView = () => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    setUser(sessionStorage.getItem('user'));
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {user ? (
          <h1>Welcome, {user}</h1>
        ) : (
            <li>
              <Login setUser={user => setUser(user)} />
            </li>
          )}
      </ul>
    </nav>
  );
}