import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';

import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { signUpValidation } from '../../utils/validations';
import { URL } from '../../constants/url';

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
      .then(_ => {
        console.log('new user success')
      })
      .catch(err => {
        this.setState({ registerError: err.error });
      })
      .finally(_ => {
        this.setState({ isFetching: false });
      });
  }

  render() {
    return (
      <div className="page flex-center">
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
