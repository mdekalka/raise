import axios from 'axios';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../types/auth';
import { authService } from '../services/auth';
import { URL } from '../constants/url';

export const loginRequest = (username, password) => ({
  type: LOGIN_REQUEST,
  username,
  password
});

export const loginSuccess = () =>({
  type: LOGIN_SUCCESS
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error
})

export const login = (username, password) => {
  return dispatch => {
    dispatch(loginRequest(username, password))

    return axios.post(URL.auth.login, { username, password })
      .then(user => {
        authService.setToken(user.token);
        dispatch(loginSuccess());
      })
      .catch(err => {
        dispatch(loginFailure(err.error || err.statusText));
        
        return Promise.reject();
      });
  }
}

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
})

export const logout = () => {
  return dispatch => {
    authService.removeToken();
      
    dispatch(logoutSuccess());

    return Promise.resolve();
  }
}
