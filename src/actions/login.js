import axios from 'axios'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../types/login'
import { authService } from '../services/auth'

export const requestLogin = (username, password) => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    username,
    password
  }
}

export const receiveLogin = () => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true
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
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(username, password))

    return axios.post('/login', { username, password})
      .then(user => {
        authService.setToken(user.token)
        dispatch(receiveLogin())
      })
      .catch(err => {
        dispatch(loginError(err.error))
      })
  }
}