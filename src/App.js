import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'

export class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

export default App
