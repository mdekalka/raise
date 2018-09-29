import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { URL } from '../../constants/url';

class ResetPasswordPage extends Component {
  state = {
    password: '',
    passwordHasUpdated: false,
    passwordUpdateError: null
  }

  updatePassword = (event) => {
    event.preventDefault();
    const token = this.props.match.params.resetToken;

    axios.post(URL.resetPassword, { token, password: this.state.password })
      .then(res => {
        this.setState({ passwordUpdateError: null, passwordHasUpdated: true })
      })
      .catch(err => {
        this.setState({ passwordUpdateError: err.error });
      })
  }

  handleChange = (event) => {
    this.setState({ password: event.target.value });
  }

  render() {
    const { passwordUpdateError, passwordHasUpdated } = this.state;

    return (
      <div>
        {passwordHasUpdated
          ? <div>Your password wassuccessfully updated. Follow this <Link to="/login">link</Link> to sign in.</div>
          : <form onSubmit={this.updatePassword}>
              Please set your new password for account.
              <div className="form-row">
                <label htmlFor="password">New password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              {passwordUpdateError && <div className="form-error">{passwordUpdateError}</div>}
              <button type="submit">Update my password.</button>
            </form>
        }
      </div>
    )
  }
}

export default ResetPasswordPage;

