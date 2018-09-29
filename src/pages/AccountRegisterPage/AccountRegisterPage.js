import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';

import './AccountRegisterPage.scss';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { signUpValidation } from '../../utils/validations';
import { URL } from '../../constants/url';
import { authService } from '../../services/auth';

class AccountRegisterPage extends Component {
  state = {
    isFetching: false,
    registerError: null
  }

  user = {
    username: '',
    email: '',
    password: ''
  }

  handleSubmit = (user) => {
    this.setState({ isFetching: true })

    axios.post(URL.auth.register, user)
      .then(response => {
        this.setState({ registerError: null });
        authService.setToken(response.token);
        this.props.history.replace('/');

      })
      .catch(err => {
        this.setState({ registerError: err.error });
      })
      .finally(() => {
        this.setState({ isFetching: false });
      });
  }

  render() {
    return (
      <div className="account-register-page flex-center">
        <Formik
            initialValues={this.user}
            validationSchema={signUpValidation}
            onSubmit={this.handleSubmit}
            render={({ values, errors, touched, handleChange, handleSubmit }) => (
              <SignUpForm
                authError={this.state.registerError}
                errors={errors}
                touched={touched}
                user={values}
                onSubmit={handleSubmit}
                onChange={handleChange} />
            )} 
          />
      </div>
    )
  }
}

export default AccountRegisterPage;
