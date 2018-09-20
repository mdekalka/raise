import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../types/logout'
import { authService } from '../services/auth'

export const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

export const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch(requestLogout());

    authService.removeToken();
      
    dispatch(receiveLogout());

    return Promise.resolve();
  }
}