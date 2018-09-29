import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';

import './ForgotPasswordPage.scss';
import { emailValidation } from '../../utils/validations';
import { URL } from '../../constants/url';
import Loader from '../../components/Loader/Loader';

class ForgotPasswordPage extends Component {
  state = {
    isFetching: false,
    resetPasswordToken: '',
    resetPasswordError: null
  }

  emailInput = React.createRef();

  componentDidMount () {
    this.emailInput.current.focus();
  }

  handleSubmit = ({ email }) => {
    this.setState({ isFetching: true });

    axios.post(URL.auth.forgotPassword, { email })
      .then(response => {
        this.setState({ resetPasswordError: null, resetPasswordToken: response.resetToken });
      })
      .catch(err => this.setState({ resetPasswordError: err.error }))
      .finally(() => this.setState({ isFetching: false }));
  }

  render() {
    const { resetPasswordToken, resetPasswordError, isFetching } = this.state;

    return (
      <div className="forgot-password-page flex-center">
        <div className="forgot-password-wrapper form-box">
          {resetPasswordToken && 
            <div className="reset-message">
              Please click the <Link className="link" to={`/forgot-password/${resetPasswordToken}`}>link</Link> and reset your password.
            </div>
          }
          {!resetPasswordToken &&
            <React.Fragment>
              <p className="forgot-password-text">Enter your email address and check you email for reset password link.</p>
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
                    {resetPasswordError && <div className="form-error">{resetPasswordError}</div>}
                    <div className="signin-meta">
                      <button className="button purple trans" type="submit">Send Reset Email</button>
                      <Link className="link" to="/login">Sign In.</Link>
                    </div>
                  </form>
                )}
              />
            </React.Fragment>
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
