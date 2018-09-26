import axios from 'axios';

import { URL } from '../constants/url';
import { extendUser } from '../utils/utils';

export const currentUserRequest = () => ({
  type: 'CURRENT_USER_REQUEST'
})

export const currentUserReceive = (user) => ({
  type: 'CURRENT_USER_RECEIVE',
  user
})

export const fetchCurrentUser = () => {
  return dispatch => {
    dispatch(currentUserRequest());

    return axios.get(URL.auth.currentUser)
      .then(response => {
        dispatch(currentUserReceive(extendUser(response.user)));
      })
      .catch(err => {
        return Promise.reject();
      });
  }
}
