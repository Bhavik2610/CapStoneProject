# Session 6 – Authentication & State Management

A small React app (Vite) demonstrating Firebase Auth + Context API, with an
optional Redux slice as an alternative state-management approach.

## Setup

```bash
npm create vite@latest session6-auth-app -- --template react
cd session6-auth-app
npm install firebase react-router-dom @reduxjs/toolkit react-redux
```

Copy the files from this project into the matching paths under `src/`.

Create a `.env` file in the project root with your Firebase Web App config
(Firebase console → Project settings → General → Your apps):

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

In the Firebase console, enable **Authentication → Sign-in method →
Email/Password**, and add at least one test user (Authentication → Users →
Add user) so you have credentials to log in with.

Run it:

```bash
npm run dev
```

## How each task is covered

**Task 1 — Firebase Auth + login form**
`src/firebase.js` initializes Firebase. `src/components/Login.jsx` is a
plain email/password form that calls `signInWithEmailAndPassword` (wrapped
by `login()` in `AuthContext`) and shows a welcome message once `user` is
set.

**Task 2 — Context API for session state**
`src/context/AuthContext.jsx` defines `AuthContext` + a `useAuth()` hook
(the "useContext hook" the assignment hints at). Any component can call
`const { user, isLoggedIn, login, logout } = useAuth();` to read or change
auth state.

**Task 3 — Protected Spotify-style dashboard**
`src/components/Dashboard.jsx` is the Spotify-inspired UI (dark sidebar +
playlist grid). It's only reachable through `src/components/ProtectedRoute.jsx`,
which redirects to `/login` via React Router's `<Navigate>` if there's no
logged-in user.

**Task 4 — Persisted session via localStorage**
`AuthContext` caches `{ uid, email }` to `localStorage` on every login/logout
and seeds its initial state from that cache, so a page refresh renders the
dashboard immediately instead of flashing the login form while Firebase's
own listener (`onAuthStateChanged`) re-confirms the session in the
background.

**Task 5 — Redux slice for auth**
See below.

## Task 5 write-up: Redux slice

**Prompt used:** *"Write a Redux Toolkit slice called authSlice that manages
authentication state with actions for login, logout, and setUser. Include
loading and error state for the login flow."*

**What the AI generated (paraphrased):** a `createSlice` with `user`,
`isAuthenticated`, `loading`, and `error` fields, and three reducers —
`login` (set user + isAuthenticated true), `logout` (clear both), and
`setUser` (same as login, for syncing from an auth listener). The
`login`/`logout` actions were synchronous only, with no separate
loading/error handling and no persistence.

**Changes made to fit this app:**
- Split the original single `login` reducer into `loginStart`,
  `loginSuccess`, and `loginFailure` so the UI can show a spinner and an
  error message while `signInWithEmailAndPassword` is in flight, matching
  the `status`/`error` fields already used by `AuthContext`.
- Renamed `loading` (boolean) to `status: 'idle' | 'loading' | 'error'` for
  clearer state transitions.
- Added `localStorage` read/write inside `loginSuccess`, `setUser`, and
  `logout` so the Redux path satisfies Task 4 the same way the Context path
  does — the AI's version had no persistence at all.
- Seeded `initialState.user` from `localStorage` on load (`loadUserFromStorage()`)
  instead of always starting `null`, so a refreshed page doesn't lose the
  session even before Firebase's listener fires.

This slice isn't wired into `App.jsx` — the app uses Context API as its
primary mechanism per Task 2 — but `src/redux/store.js` shows how you'd
mount it with `configureStore` if you wanted Redux instead of (or alongside)
Context. To switch, wrap `<App />` in `<Provider store={store}>` and swap
`useAuth()` calls for `useSelector`/`useDispatch`.
