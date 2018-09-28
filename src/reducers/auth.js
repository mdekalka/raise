import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../types/auth';
import { AUTH_TOKEN } from '../constants/constants';

const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem(AUTH_TOKEN) ? true : false,
  error: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true, error: null };

    case LOGIN_SUCCESS:
      return { isFetching: false, isAuthenticated: true, error: null };

    case LOGIN_FAILURE:
      return { isFetching: false, isAuthenticated: false, error: action.error };

    case LOGOUT_SUCCESS:
      return { ...state, isFetching: false, isAuthenticated: false }

    default:
      return state
  }
}

export default auth;
