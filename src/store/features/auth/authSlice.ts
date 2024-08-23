import { createSlice } from '@reduxjs/toolkit';

import { IInitialState } from './types';

const initialState: IInitialState = {
  initialTransaction: undefined,
  signUpDetail: undefined,
  user: undefined,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userInitialTransaction: (state, action) => {
      state.initialTransaction = action.payload;
    },
    userSignUp: (state, action) => {
      state.signUpDetail = action.payload;
    },
    userLoggedIn: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.user = undefined;
      state.signUpDetail = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const {
  userSignUp,
  userLoggedIn,
  userLoggedOut,
  userInitialTransaction,
} = authSlice.actions;

export default authSlice.reducer;
