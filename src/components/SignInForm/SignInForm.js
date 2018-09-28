import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './SignInForm.scss';


export class SignInForm extends PureComponent {
  render() {
    const { onSubmit, onChange, username, password, errors, touched, authError } = this.props;

    return (
      <div className="auth-signin form-box">
        <h5 className="auth-title">Login to your account:</h5>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="username"
              onChange={onChange}
              value={username}
              className={errors.username && touched.username ? 'input-invalid' : null}
              placeholder="Username" />
              {errors.username && touched.username &&
                <div className="form-error">{errors.username}</div>
              }
          </div>
          <div className="form-row">
            <input
              type="password"
              name="password"
              onChange={onChange}
              value={password}
              className={errors.password && touched.password ? 'input-invalid' : null}
              placeholder="Password" />
              {errors.password && touched.password &&
                <div className="form-error">{errors.password}</div>
              }
          </div>
          <div className="signin-meta">
            <button className="button purple trans" type="submit">Sign In</button>
            <Link className="link" to="/forgot-password">Forgot password?</Link>
          </div>
        </form>
        {authError && <div className="auth-error form-error">{authError}</div>}
        <div className="no-account">
          Don't have an account? <Link className="link" to="/register">Sign Up.</Link>
        </div>
      </div>
    )
  }
}

export default SignInForm
