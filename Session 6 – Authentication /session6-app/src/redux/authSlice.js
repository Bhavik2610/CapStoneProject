// src/redux/authSlice.js
//
// Task 5: Redux slice for auth state (login / logout / setUser).
// This app uses Context API as its primary approach (Task 2), but this
// slice shows the equivalent done in Redux Toolkit, for teams that prefer
// a centralized store over Context - see README.md for the writeup on
// what was changed from the initial AI-generated draft.

import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "auth:user";

function loadUserFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const initialState = {
  user: loadUserFromStorage(), // Task 4: seed from localStorage on load
  isAuthenticated: Boolean(loadUserFromStorage()),
  status: "idle", // 'idle' | 'loading' | 'error'
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.status = "loading";
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = "idle";
      state.error = null;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
    },
    loginFailure(state, action) {
      state.status = "error";
      state.error = action.payload;
    },
    setUser(state, action) {
      // Used by the Firebase onAuthStateChanged listener to sync Redux
      // with whatever Firebase decides the current session is.
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      if (action.payload) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, setUser, logout } =
  authSlice.actions;

export default authSlice.reducer;
