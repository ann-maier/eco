import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { Login } from './components/login';
import { CarouselView } from './components/carousel';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: sessionStorage.getItem('user')
    };
  }

  componentDidMount() {
    this.setState({});
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              {this.user ? (
                <h1>Welcome {this.user}</h1>
              ) : (
                <li>
                  <Link to='/login'>Sign in</Link>
                </li>
              )}
            </ul>
          </nav>

          <Switch>
            <Route exact path='/'>
              <CarouselView />
            </Route>
            <Route path='/login' component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}
