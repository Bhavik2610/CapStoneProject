import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { logIn, signUp } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

// Task 1: email + password login form (with a sign-up toggle so you can
// create a test account without opening the Firebase console).
export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  // If already logged in (or once login succeeds), go to the dashboard.
  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [loading, user, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "login") {
        await logIn(email, password);
      } else {
        await signUp(email, password);
      }
      // No manual redirect needed here — the effect above reacts to the
      // Context user updating, but we also nudge it for immediacy.
      router.replace("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>{mode === "login" ? "Log in" : "Create account"}</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" disabled={busy} style={styles.primary}>
            {busy ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>

        <p style={styles.toggle}>
          {mode === "login" ? "No account yet?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }}
            style={styles.link}
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </main>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#121212", fontFamily: "system-ui, sans-serif" },
  card: { width: "100%", maxWidth: 360, background: "#181818", padding: "2rem", borderRadius: 14, boxShadow: "0 20px 60px rgba(0,0,0,0.4)" },
  title: { color: "#fff", marginTop: 0, textAlign: "center" },
  form: { display: "grid", gap: "0.75rem" },
  input: { padding: "0.7rem 0.85rem", borderRadius: 8, border: "1px solid #333", background: "#0f0f0f", color: "#fff", fontSize: "0.95rem" },
  primary: { padding: "0.75rem", border: "none", borderRadius: 999, background: "#1db954", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.95rem" },
  error: { color: "#ff6b6b", margin: 0, fontSize: "0.85rem" },
  toggle: { color: "#b3b3b3", textAlign: "center", fontSize: "0.85rem", marginBottom: 0 },
  link: { background: "none", border: "none", color: "#1db954", cursor: "pointer", fontWeight: 700, padding: 0 },
};
