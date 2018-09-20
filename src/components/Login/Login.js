import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Login.css'

import { loginUser } from '../../actions/login'
import { authService } from '../../services/auth'


class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  componentDidMount() {
    if (authService.isAuthenticated()) {
      this.props.history.replace('/')
    }
  }

  handleChange = (event) => {
    const { target } = event;

    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.loginUser(this.state.username, this.state.password).then(_ => {
      this.props.history.replace('/');
    });
  }

  render() {
    return (
      <div>
        <h4>login</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <label className="label" htmlFor="username">username</label>
            <input type="text" name="username" onChange={this.handleChange} value={this.state.username} />
          </div>
          <div className="row">
            <label className="label" htmlFor="password">password</label>
            <input type="text" name="password" onChange={this.handleChange} value={this.state.password} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  loginUser
}

export default connect(null, mapDispatchToProps)(Login)