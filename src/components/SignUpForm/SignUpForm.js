import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './SignUpForm.scss';


class SignUpForm extends Component {
  render() {
    const { onSubmit, onChange, user, errors, touched, authError } = this.props;

    return (
      <div className="auth-signup form-box">
        <h5 className="signup-title">Create a new account:</h5>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="username"
              onChange={onChange}
              value={user.username}
              className={errors.username && touched.username ? 'input-invalid' : null}
              placeholder="Username" />
              {errors.username && touched.username &&
                <div className="form-error">{errors.username}</div>
              }
          </div>
          <div className="form-row">
            <input
              type="email"
              name="email"
              onChange={onChange}
              value={user.email}
              className={errors.email && touched.email ? 'input-invalid' : null}
              placeholder="Email" />
              {errors.email && touched.email &&
                <div className="form-error">{errors.email}</div>
              }
          </div>
          <div className="form-row">
            <input
              type="password"
              name="password"
              onChange={onChange}
              value={user.password}
              className={errors.password && touched.password ? 'input-invalid' : null}
              placeholder="Password" />
              {errors.password && touched.password &&
                <div className="form-error">{errors.password}</div>
              }
          </div>
          {authError && <div className="auth-error form-error">{authError}</div>}
          <button type="submit" className="button purple trans">Create account</button>
        </form>
        <div className="account-exists">
          Already have an account? <Link className="link" to="/login">Sign In.</Link>
        </div>
      </div>
    )
  }
}

export default SignUpForm;
