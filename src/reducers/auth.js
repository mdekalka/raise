import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../types/login';
import { LOGOUT_SUCCESS } from '../types/logout';

const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  error: null,
  userId: null
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })

    case LOGIN_SUCCESS:
      return { ...state, isFetching: false, userId: action.userId, isAuthenticated: true, error: null };

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        error: action.error
      })

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })

    default:
      return state
  }
}

export default auth
