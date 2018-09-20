import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './SignInForm.scss';


export class SignInForm extends PureComponent {
  render() {
    const { onSubmit, onChange, username, password } = this.props;

    return (
      <div className="auth-signin">
        <h5 className="auth-title">Login to your account</h5>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <input type="text" name="username" onChange={onChange} value={username} placeholder="Username" />
          </div>
          <div className="form-row">
            <input type="password" name="password" onChange={onChange} value={password} placeholder="Password" />
          </div>
          <div className="signin-meta">
            <button className="signin-button button purple trans" type="submit">Sign In</button>
            <Link className="signin-forgot-password link" to="/forgot-password">Forgot password?</Link>
          </div>
        </form>
        <div className="signin-no-account">
          Don't have an account? <Link className="link" to="/register">Sign Up</Link>
        </div>
      </div>
    )
  }
}

export default SignInForm
