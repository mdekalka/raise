import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import './LoginPage.scss'
import { loginUser } from '../../actions/login';
import { authService } from '../../services/auth';
import { signInValidation } from '../../utils/validations';

import SignInForm from '../../components/SignInForm/SignInForm';
import Loader from '../../components/Loader/Loader';


class Login extends Component {
  user = {
    username: 'admin',
    password: 'admin'
  }

  componentDidMount() {
    if (authService.isAuthenticated()) {
      this.props.history.replace('/')
    }
  }

  handleSubmit = (user) => {
    this.props.loginUser(user.username, user.password)
      .then(_ => {
        this.props.history.replace('/');
      });
  }

  render() {
    return (
      <div className="login-page page flex-center">
        <div className="auth-form">
          <Formik
            initialValues={this.user}
            validationSchema={signInValidation}
            onSubmit={this.handleSubmit}
            render={({ values, errors, touched, handleChange, handleSubmit }) => (
              <SignInForm
                authError={this.props.authError}
                errors={errors}
                touched={touched}
                username={values.username}
                password={values.password}
                onSubmit={handleSubmit}
                onChange={handleChange} />
            )} 
          />
          {this.props.isFetching && <Loader message="Authenticating..." />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  authError: state.auth.error
});

const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login)