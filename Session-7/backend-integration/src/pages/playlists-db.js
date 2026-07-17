import { useEffect, useState } from "react";
import { getPlaylists, seedSamplePlaylist } from "@/lib/playlists";

// Task 1: view the "playlists" collection and seed a sample document.
export default function PlaylistsDbPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seeding, setSeeding] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setPlaylists(await getPlaylists());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSeed() {
    setSeeding(true);
    try {
      await seedSamplePlaylist();
      await load(); // re-fetch so the UI shows the new document
    } catch (err) {
      setError(err.message);
    } finally {
      setSeeding(false);
    }
  }

  return (
    <main style={styles.page}>
      <h1>Playlists (Firestore)</h1>
      <button onClick={handleSeed} disabled={seeding} style={styles.button}>
        {seeding ? "Adding…" : "Add sample playlist"}
      </button>

      {loading && <p>Loading…</p>}
      {error && <p style={styles.error}>Error: {error}</p>}
      {!loading && !error && playlists.length === 0 && <p>No playlists yet. Add one above.</p>}

      <ul style={styles.list}>
        {playlists.map((p) => (
          <li key={p.id} style={styles.card}>
            <strong>{p.name}</strong> — {p.songs?.length ?? 0} songs
            <ul>
              {p.songs?.map((song) => (
                <li key={song}>{song}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}

const styles = {
  page: { fontFamily: "system-ui, sans-serif", maxWidth: 640, margin: "0 auto", padding: "2rem 1.5rem" },
  button: { padding: "0.6rem 1rem", border: "none", borderRadius: 8, background: "#1db954", color: "#fff", fontWeight: 700, cursor: "pointer" },
  list: { listStyle: "none", padding: 0, marginTop: "1.5rem", display: "grid", gap: "0.75rem" },
  card: { background: "#f6f6f6", borderRadius: 10, padding: "0.9rem 1.1rem" },
  error: { color: "#c0392b" },
};
