import axios from 'axios';
import { authService } from '../services/auth'

axios.interceptors.request.use(config => {
  if (authService.isAuthenticated()) {
    config.headers.Authorization = `bearer ${authService.getToken()}`;
  }

  return config;
});


axios.interceptors.response.use(
  response => response.data,
  error => {
    const { response } = error;
    const responseError = {
      status: response.status,
      statusText: response.statusText,
      ...response.data
    }
  
    return Promise.reject(responseError);
  }
);
