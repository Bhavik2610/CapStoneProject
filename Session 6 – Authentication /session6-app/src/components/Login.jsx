// src/components/Login.jsx
//
// Task 1: basic email/password login form. On success it shows a welcome
// message. Because it reads `user` from context, this component re-renders
// automatically the instant login succeeds - no manual "did it work?"
// checks needed. That's the "UI reactivity to login state" the session
// wants to emphasize.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, user, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      // error is already captured in context state and rendered below
    } finally {
      setSubmitting(false);
    }
  }

  // If a user is already present (e.g. session restored from localStorage /
  // Firebase persistence), skip the form and show the welcome message
  // immediately - this is the reactivity the assignment is after.
  if (user) {
    return (
      <div className="auth-card">
        <h2>Welcome back, {user.email}! 👋</h2>
        <p>You're already logged in.</p>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
