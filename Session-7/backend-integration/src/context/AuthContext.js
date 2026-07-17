import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

// Task 2: React Context that holds the current user's login state so any
// component can read it with the useAuth() hook.

const AuthContext = createContext({ user: null, loading: true });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // `loading` is true until Firebase tells us whether someone is signed in.
  // This is what stops a page refresh from briefly bouncing a logged-in user
  // to the login screen before their session is restored.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Task 4: persist the session in the browser so a refresh keeps the user
    // logged in. (This is Firebase's default, but we set it explicitly.)
    setPersistence(auth, browserLocalPersistence).catch((err) =>
      console.error("Could not set auth persistence:", err)
    );

    // onAuthStateChanged fires once on load (restoring any saved session) and
    // again every time the user logs in or out.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // clean up the listener on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Convenience hook so components can do: const { user, loading } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
