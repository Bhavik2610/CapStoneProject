import { useEffect, useState } from "react";
import { getWatchlist, seedSampleWatchlist } from "@/lib/watchlists";

// Task 3: fetch the "watchlists" collection and show movie + status.
export default function WatchlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setItems(await getWatchlist());
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
    try {
      await seedSampleWatchlist();
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main style={styles.page}>
      <h1>My Watchlist</h1>
      <button onClick={handleSeed} style={styles.button}>Add sample movies</button>

      {loading && <p>Loading…</p>}
      {error && <p style={styles.error}>Error: {error}</p>}
      {!loading && !error && items.length === 0 && <p>No movies yet. Add some above.</p>}

      <ul style={styles.list}>
        {items.map((item) => (
          <li key={item.id} style={styles.row}>
            <span>{item.movie}</span>
            <span style={{ ...styles.badge, ...(item.watched ? styles.watched : styles.notWatched) }}>
              {item.watched ? "Watched" : "Not watched"}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}

const styles = {
  page: { fontFamily: "system-ui, sans-serif", maxWidth: 560, margin: "0 auto", padding: "2rem 1.5rem" },
  button: { padding: "0.6rem 1rem", border: "none", borderRadius: 8, background: "#e23744", color: "#fff", fontWeight: 700, cursor: "pointer" },
  list: { listStyle: "none", padding: 0, marginTop: "1.5rem", display: "grid", gap: "0.6rem" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: "0.8rem 1rem" },
  badge: { fontSize: "0.8rem", fontWeight: 700, padding: "0.25rem 0.6rem", borderRadius: 999 },
  watched: { background: "#e6f7ed", color: "#1a7f45" },
  notWatched: { background: "#fdecec", color: "#c0392b" },
  error: { color: "#c0392b" },
};
