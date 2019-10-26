import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { MenuView } from './components/menu';
import { CarouselView } from './components/carousel';
import { Map } from './components/map';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <MenuView />
          <Switch>
            <Route exact path="/" component={CarouselView} />
            <Route path="/map" component={Map} />
          </Switch>
        </div>
      </Router>
    );
  }
}
