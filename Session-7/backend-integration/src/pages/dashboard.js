import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "@/components/LogoutButton";
import PlaylistCard from "@/components/PlaylistCard";
import { useAuth } from "@/context/AuthContext";

const PLAYLISTS = [
  { id: 1, name: "Liked Songs", songCount: 128, image: "https://picsum.photos/seed/liked/300" },
  { id: 2, name: "Daily Mix 1", songCount: 50, image: "https://picsum.photos/seed/daily/300" },
  { id: 3, name: "Discover Weekly", songCount: 30, image: "https://picsum.photos/seed/discover/300" },
];

// The actual dashboard content (only rendered when logged in).
function Dashboard() {
  const { user } = useAuth(); // Task 2: read the logged-in user from Context

  return (
    <div style={styles.page}>
      {/* Task 2: user's email shown at the top when logged in */}
      <header style={styles.header}>
        <span style={styles.brand}>Spotify</span>
        <div style={styles.userBox}>
          <span style={styles.email}>{user?.email}</span>
          {/* Task 5: logout button integrated here */}
          <LogoutButton />
        </div>
      </header>

      <main style={styles.main}>
        <h1 style={styles.h1}>Good evening</h1>
        <div style={styles.grid}>
          {PLAYLISTS.map((p) => (
            <PlaylistCard key={p.id} image={p.image} name={p.name} songCount={p.songCount} />
          ))}
        </div>
      </main>
    </div>
  );
}

// Task 3: wrap the page so it only renders for authenticated users.
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#121212", color: "#fff", fontFamily: "system-ui, sans-serif" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: "1px solid #282828" },
  brand: { color: "#1db954", fontWeight: 800, fontSize: "1.25rem" },
  userBox: { display: "flex", alignItems: "center", gap: "1rem" },
  email: { color: "#b3b3b3", fontSize: "0.9rem" },
  main: { padding: "2rem 1.5rem", maxWidth: 1000, margin: "0 auto" },
  h1: { marginTop: 0 },
  grid: { display: "flex", gap: 16, flexWrap: "wrap" },
};
