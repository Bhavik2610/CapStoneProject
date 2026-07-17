// Firebase initialization (client SDK, modular v9+ API).
// Reads config from the NEXT_PUBLIC_FIREBASE_* variables in .env.local.

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// In Next.js, modules can be evaluated more than once (hot reload / SSR).
// Calling initializeApp twice throws "Firebase App '[DEFAULT]' already exists",
// so reuse the existing app if one is already initialized.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firestore database handle used by all the CRUD helpers.
export const db = getFirestore(app);
export default app;
