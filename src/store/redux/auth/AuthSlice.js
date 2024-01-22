// AuthSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      user: '',
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.user = '';
      state.login.success = false;
      state.login.isFetching = true;
      state.login.error = true;
    },
    loginSuccess: (state, action) => {
      state.login.user = action.payload;
      state.login.isFetching = false;
      state.login.success = true;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.user = '';
      state.login.success = false;
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailed } = authSlice.actions;
export default authSlice.reducer;
