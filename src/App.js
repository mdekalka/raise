import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, withRouter } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Protected from './components/Protected/Protected'
import { logoutUser } from './actions/logout'


export class App extends React.Component {
  logout = () => {
    this.props.logoutUser().then(_ => {
      this.props.history.push('/login');
      window.location.reload();
    })
  }

  render() {
    return (
      <div className="container">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/protected">Protected</Link></li>
            <li><button onClick={this.logout}>logout</button></li>
          </ul>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/protected" component={Protected} />
          </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = { logoutUser }

export default withRouter(connect(null, mapDispatchToProps)(App))