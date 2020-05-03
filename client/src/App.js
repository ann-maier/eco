import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { MenuView } from './components/menu';
import { Home } from './components/home';
import { MapView } from './components/map';

import { get } from './utils/httpService';
import { ENVIRONMENTS_URL } from './utils/constants';

import {
  EnvironmentsInfoContextProvider,
  environmentsInfoInitialState,
} from './components/context/environmentsInfoContext';

export const App = () => {
  const [user, setUser] = React.useState({});
  const [environmentsInfo, setEnvironmentsInfo] = useState(
    environmentsInfoInitialState
  );

  React.useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user')));
  }, []);

  useEffect(() => {
    get(ENVIRONMENTS_URL).then(({ data }) =>
      setEnvironmentsInfo({
        selected: null,
        environments: data,
      })
    );
  }, []);

  return (
    <Router>
      <div className='App'>
        <EnvironmentsInfoContextProvider
          value={{ environmentsInfo, setEnvironmentsInfo }}
        >
          <MenuView user={user} setUser={setUser} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/earth' component={() => <MapView user={user} />} />
          </Switch>
        </EnvironmentsInfoContextProvider>
      </div>
    </Router>
  );
};
