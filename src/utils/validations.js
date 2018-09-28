import * as Yup from 'yup';

const MIN_USERNAME_LENGTH = 5;
const MIN_PASSWORD_LENGTH = MIN_USERNAME_LENGTH;

export const signInValidation = Yup.object().shape({
  username: Yup.string()
    .min(MIN_USERNAME_LENGTH, `Username must be at least ${MIN_USERNAME_LENGTH} characters long.`)
    .required('Username is required.'),
  password: Yup.string()
    .min(MIN_PASSWORD_LENGTH, `Pawword must be at least ${MIN_PASSWORD_LENGTH} charactes long.`)
    .required('Password is required.')
});

export const emailValidation = Yup.object().shape({
  email: Yup.string().email('Email is not valid.').required('Email is required.')
});

export const signUpValidation = Yup.object().shape({
  username: Yup.string()
    .min(MIN_USERNAME_LENGTH, `Username must be at least ${MIN_USERNAME_LENGTH} characters long.`)
    .required('Username is required.'),
  email: Yup.string()
    .email('Email is not valid.').required('Email is required.'),
  password: Yup.string()
    .min(MIN_PASSWORD_LENGTH, `Pawword must be at least ${MIN_PASSWORD_LENGTH} charactes long.`)
    .required('Password is required.')
});
