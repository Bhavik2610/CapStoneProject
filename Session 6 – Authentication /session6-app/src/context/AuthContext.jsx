// src/context/AuthContext.jsx
//
// Task 2: React Context that stores the current user and exposes it (plus
// login/logout helpers) to every component via a `useAuth()` hook.
//
// Task 4: Session persistence. Firebase's onAuthStateChanged already persists
// sessions across refreshes on its own (it keeps the user signed in via
// IndexedDB), but the assignment specifically asks for localStorage, so we
// mirror the lightweight user info (uid, email) into localStorage ourselves.
// That gives us an instant "is someone probably logged in?" value to render
// with on first paint, before Firebase's async listener has resolved -
// which avoids a flash of the login screen for an already-logged-in user.

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const STORAGE_KEY = "auth:user";

const AuthContext = createContext(undefined);

function readCachedUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function cacheUser(user) {
  if (user) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ uid: user.uid, email: user.email })
    );
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function AuthProvider({ children }) {
  // Seed state from localStorage so a refreshed page renders the dashboard
  // immediately instead of bouncing to the login screen while Firebase
  // re-establishes the session in the background.
  const [user, setUser] = useState(readCachedUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      cacheUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function login(email, password) {
    setError(null);
    try {
      const { user: loggedInUser } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      cacheUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function logout() {
    await signOut(auth);
    cacheUser(null);
  }

  const value = {
    user,
    isLoggedIn: Boolean(user),
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hint from the assignment: "Create an AuthContext and useContext hook to
// share the user object." This is that hook.
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return context;
}
