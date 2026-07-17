// src/components/Dashboard.jsx
//
// Task 3 (dashboard half): a Spotify-inspired layout - dark sidebar + a
// grid of "playlist" cards - that only ever renders for a logged-in user
// because it's wrapped in <ProtectedRoute> in App.jsx.

import { useAuth } from "../context/AuthContext";

const MOCK_PLAYLISTS = [
  { id: 1, name: "Deep Focus", tracks: 128 },
  { id: 2, name: "Coding Beats", tracks: 87 },
  { id: 3, name: "Late Night Lo-fi", tracks: 54 },
  { id: 4, name: "Weekend Mix", tracks: 32 },
  { id: 5, name: "Throwback Hits", tracks: 210 },
  { id: 6, name: "Chill Acoustic", tracks: 76 },
];

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h1 className="logo">🎧 SoundSpace</h1>
        <nav>
          <a className="active" href="#">Home</a>
          <a href="#">Search</a>
          <a href="#">Your Library</a>
        </nav>
        <div className="sidebar-footer">
          <p>{user?.email}</p>
          <button onClick={logout}>Log out</button>
        </div>
      </aside>

      <main className="content">
        <header>
          <h2>Good to see you, {user?.email}</h2>
        </header>

        <section>
          <h3>Your Playlists</h3>
          <div className="playlist-grid">
            {MOCK_PLAYLISTS.map((p) => (
              <div className="playlist-card" key={p.id}>
                <div className="cover" aria-hidden="true" />
                <p className="playlist-name">{p.name}</p>
                <p className="playlist-meta">{p.tracks} tracks</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
