import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Login } from './components/login';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <Login />
    </div>
  )
};

export default App;
