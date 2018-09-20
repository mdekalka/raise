import decode from 'jwt-decode';

import { AUTH_TOKEN } from '../constants/constants'

export const authService = {
  setToken(token) {
    if (token) {
      try {
        localStorage.setItem(AUTH_TOKEN, token);
      } catch(err) {
        console.log(err);
      }
    }
  },

  getToken() {
    try {
      return localStorage.getItem(AUTH_TOKEN);
    } catch(err) {
      console.log(err);
      return null;
    }
  },

  removeToken() {
    try {
      localStorage.removeItem(AUTH_TOKEN);
    } catch(err) {
      console.log(err);
    }
  },

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      
      return decoded.exp < Date.now() / 1000 ? true : false
    } catch (err) {
      return false;
    }
  },

  isAuthenticated() {
    const token = this.getToken();
    this.isAuth = !!token && !this.isTokenExpired(token);
    
    return !!token && !this.isTokenExpired(token);
  }
}