// src/components/ProtectedRoute.jsx
//
// Task 3 (redirect half): wraps any route that should only be visible to
// logged-in users. If there's no user, it bounces to /login instead of
// rendering the protected page.

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  // Wait for Firebase's initial auth check before deciding - otherwise a
  // logged-in user would flash to /login for a split second on refresh.
  if (loading) return <p className="loading">Checking session…</p>;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
