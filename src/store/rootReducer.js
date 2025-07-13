import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';

const rootReducer = combineReducers({
  auth: authReducer,
  // add more reducers here
});

export default rootReducer; 