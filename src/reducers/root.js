import { combineReducers } from 'redux';
import auth from './auth';
import quotes from './quotes';

export const rootReducer = combineReducers({
  auth,
  quotes
});
