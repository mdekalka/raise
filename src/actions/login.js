import axios from 'axios'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../types/login';
import { authService } from '../services/auth';
import { URL } from '../constants/url';

export const requestLogin = (username, password) => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    username,
    password
  }
}

export const receiveLogin = (userId) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    userId
  }
}

export const loginError = (error) => {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    error
  }
}

export const loginUser = (username, password) => {
  return dispatch => {
    dispatch(requestLogin(username, password))

    return axios.post(URL.auth.login, { username, password })
      .then(user => {
        authService.setToken(user.token)
        dispatch(receiveLogin(user.userId))
      })
      .catch(err => {
        dispatch(loginError(err.error || err.statusText));
        
        return Promise.reject();
      })
  }
}