import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import './LoginPage.scss'
import { login } from '../../actions/auth';
import { authService } from '../../services/auth';
import { signInValidation } from '../../utils/validations';

import SignInForm from '../../components/SignInForm/SignInForm';
import Loader from '../../components/Loader/Loader';


class Login extends Component {
  user = {
    username: '',
    password: ''
  }

  componentDidMount() {
    if (authService.isAuthenticated()) {
      this.props.history.replace('/');
    }
  }

  handleSubmit = (user) => {
    this.props.login(user.username, user.password)
      .then(_ => {
        this.props.history.replace('/');
      });
  }

  render() {
    return (
      <div className="login-page page flex-center">
        <h1 className="company-title">Raise</h1>
        <div className="moon">
          <div className="moon-texture"></div>
        </div>
        <div className="background-layer layer-1"></div>
        <div className="background-layer layer-2"></div>
        <div className="background-layer layer-3"></div>
        <div className="background-layer layer-4"></div>
        <div className="background-layer layer-5"></div>
        <div className="background-layer layer-6"></div>
        <div className="background-layer layer-7"></div>
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

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login)