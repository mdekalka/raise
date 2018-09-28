import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';

import './ForgotPasswordPage.scss';
import { emailValidation } from '../../utils/validations';
import { URL } from '../../constants/url';
import Loader from '../../components/Loader/Loader';

const LOGIN_REDIRECT_DELAY = 3500;

class ForgotPasswordPage extends Component {
  state = {
    isFetching: false,
    resetPasswordMessage: ''
  }

  emailInput = React.createRef();

  componentDidMount () {
    this.emailInput.current.focus();
  }

  handleSubmit = ({ email }) => {
    this.setState({ isFetching: true });

    axios.post(URL.auth.forgotPassword, { email })
      .then(response => {
        this.setState({ resetPasswordMessage: response.message });
        setTimeout(_ => this.props.history.push('/login'), LOGIN_REDIRECT_DELAY);
      })
      .finally(_ => {
        this.setState({ isFetching: false });
      });
  }

  render() {
    const { resetPasswordMessage, isFetching } = this.state;

    return (
      <div className="forgot-password-page page flex-center">
        <div className="forgot-password-wrapper form-box">
          {resetPasswordMessage
            ? <div className="redirect-message">
                <p className="redirect-text">{resetPasswordMessage}.</p>
                <p className="redirect-link">Redirecting to Login page <span className="blinking-point"></span></p>
              </div>
            : <p className="forgot-password-text">Enter your email address and check you email for reset password link.</p>
          }
          {!resetPasswordMessage &&
            <Formik
              initialValues={{ email: '' }}
              validationSchema={emailValidation}
              onSubmit={this.handleSubmit}
              render={({ values, errors, touched, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      ref={this.emailInput}
                      className={errors.email && touched.email ? 'input-invalid' : null}
                      onChange={handleChange}
                      placeholder="Email" />
                      {errors.email && touched.email &&
                        <div className="form-error">{errors.email}</div>
                      }
                  </div>
                  <div className="signin-meta">
                    <button className="button purple trans" type="submit">Send Reset Email</button>
                    <Link className="link" to="/login">Sign In.</Link>
                  </div>
                </form>
              )}
            />
          }
          <div className="no-account">
            Don't have an account? <Link className="link" to="/register">Sign Up.</Link>
          </div>
          {isFetching && <Loader />}
        </div>
      </div>
    )
  }
}

export default ForgotPasswordPage;
