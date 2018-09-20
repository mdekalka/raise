import React, { Component } from 'react';
import { connect } from 'react-redux';

import './LoginPage.scss'
import { loginUser } from '../../actions/login';
import { authService } from '../../services/auth';
import SignInForm from '../../components/SignInForm/SignInForm';


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

    this.setState({ [target.name]: target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.loginUser(this.state.username, this.state.password).then(_ => {
      this.props.history.replace('/');
    });
  }

  render() {
    return (
      <div className="login-page page flex-center">
        <SignInForm
          username={this.state.username}
          password={this.state.password}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}/>
      </div>
    )
  }
}

const mapDispatchToProps = {
  loginUser
}

export default connect(null, mapDispatchToProps)(Login)