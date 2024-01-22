// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/AuthSlice"; // Corrected import statement

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
