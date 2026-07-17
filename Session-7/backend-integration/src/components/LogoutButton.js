import { useRouter } from "next/router";
import { logOut } from "@/lib/auth";

// Task 5: a reusable logout button.
//
// It signs the user out of Firebase Auth. We do NOT manually clear the
// Context here — signing out triggers onAuthStateChanged in AuthContext,
// which sets `user` back to null. That's the clean pattern: one source of
// truth (Firebase), and the Context mirrors it.

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await logOut();
      router.replace("/login"); // send them back to the login page
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button onClick={handleLogout} style={styles.button}>
      Log out
    </button>
  );
}

const styles = {
  button: {
    padding: "0.45rem 0.9rem",
    border: "1px solid #444",
    borderRadius: 8,
    background: "transparent",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
};
