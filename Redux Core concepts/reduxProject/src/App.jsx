import { useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./redux/store";
import { addSong, removeSong } from "./redux/playlistActions";

// Reads from and dispatches to the store.
function Playlist() {
  // Task 4: useSelector reads the playlist from the store. When the store
  // changes, this component re-renders automatically.
  const songs = useSelector((state) => state);
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    dispatch(addSong(trimmed)); // Task 4: dispatch addSong
    setName("");
  }

  return (
    <main style={styles.page}>
      <h1 style={styles.h1}>My Playlist (Redux)</h1>

      <form onSubmit={handleAdd} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Add a song…"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" style={styles.add}>Add</button>
      </form>

      {songs.length === 0 ? (
        <p style={styles.empty}>No songs yet. Add one above.</p>
      ) : (
        <ul style={styles.list}>
          {songs.map((song, i) => (
            <li key={`${song}-${i}`} style={styles.row}>
              <span>{song}</span>
              {/* Task 5: dispatch removeSong on click */}
              <button style={styles.remove} onClick={() => dispatch(removeSong(song))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

// Task 4: Provider makes the store available to everything inside it.
export default function App() {
  return (
    <Provider store={store}>
      <Playlist />
    </Provider>
  );
}

const styles = {
  page: { fontFamily: "system-ui, sans-serif", maxWidth: 480, margin: "3rem auto", padding: "0 1.5rem" },
  h1: { textAlign: "center" },
  form: { display: "flex", gap: "0.5rem", marginBottom: "1.5rem" },
  input: { flex: 1, padding: "0.6rem 0.75rem", borderRadius: 8, border: "1px solid #ccc", fontSize: "0.95rem" },
  add: { padding: "0.6rem 1.1rem", border: "none", borderRadius: 8, background: "#1db954", color: "#fff", fontWeight: 700, cursor: "pointer" },
  empty: { color: "#888", textAlign: "center" },
  list: { listStyle: "none", padding: 0, display: "grid", gap: "0.5rem" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f6f6f6", borderRadius: 8, padding: "0.7rem 1rem" },
  remove: { border: "1px solid #e23744", color: "#e23744", background: "#fff", borderRadius: 6, padding: "0.3rem 0.7rem", cursor: "pointer", fontSize: "0.85rem" },
};
