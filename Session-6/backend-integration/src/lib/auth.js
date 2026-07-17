// Auth helper functions wrapping Firebase Auth (Tasks 1 & 5).
// Same async/await + try/catch pattern as the Firestore helpers.

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

// Turn Firebase's error codes into readable messages for the UI.
function friendlyAuthError(error) {
  const map = {
    "auth/invalid-email": "That email address looks invalid.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Email or password is incorrect.",
    "auth/email-already-in-use": "An account with that email already exists.",
    "auth/weak-password": "Password should be at least 6 characters.",
  };
  return map[error.code] ?? "Something went wrong. Please try again.";
}

// Task 1: sign an existing user in with email + password.
export async function logIn(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error(friendlyAuthError(error));
  }
}

// Create a new account (handy so you have a user to test the login with).
export async function signUp(email, password) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (error) {
    console.error("Sign up failed:", error);
    throw new Error(friendlyAuthError(error));
  }
}

// Task 5: sign the current user out. The AuthContext listener reacts
// automatically and sets the user back to null.
export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error("Could not sign out. Please try again.");
  }
}
