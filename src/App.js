import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import AccountRegisterPage from './pages/AccountRegisterPage/AccountRegisterPage'


export class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Route exact path="/register" component={AccountRegisterPage} />
          <PrivateRoute path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
