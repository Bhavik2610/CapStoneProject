import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

// Task 3: wrap any page in <ProtectedRoute> to require login.
//
// The key detail (and why Task 4 works): we wait for `loading` to finish
// before deciding anything. While Firebase is restoring a saved session we
// show "Checking session…" instead of redirecting — so refreshing the
// dashboard keeps a logged-in user on the dashboard.

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <p style={{ padding: "2rem", fontFamily: "system-ui" }}>Checking session…</p>;
  }

  // Not logged in: render nothing while the redirect above runs.
  if (!user) return null;

  // Logged in: show the protected content.
  return children;
}
