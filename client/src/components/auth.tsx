import React from 'react';

import { post } from '../utils/httpService';
import { LOGIN_URL } from '../utils/constants';

export const Auth: React.FunctionComponent = () => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginUser = () => {
    post(LOGIN_URL, { login, password }).then(({ data }) => {
      alert(`Logged: ${data.success}`);
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="login"
        value={login}
        onChange={e => setLogin(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={loginUser}>Login</button>
    </div>
  );
};
