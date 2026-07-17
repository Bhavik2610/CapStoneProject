// src/redux/store.js
// Wires the auth slice into a store. Only needed if you go the Redux route
// instead of (or alongside) the Context API from Task 2.

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
