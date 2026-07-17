import { useEffect } from "react";
import { readZomatoConfig } from "@/utils/api";

// Task 3 (server side): NEXT_PUBLIC_ vars are inlined at build time, so this
// top-level log runs during SSR and prints in the terminal running `npm run dev`.
console.log("[server] NEXT_PUBLIC_SPOTIFY_API_KEY =", process.env.NEXT_PUBLIC_SPOTIFY_API_KEY);

export default function Home() {
  useEffect(() => {
    // Task 3 (client side): this log appears in the browser DevTools console.
    console.log("[client] NEXT_PUBLIC_SPOTIFY_API_KEY =", process.env.NEXT_PUBLIC_SPOTIFY_API_KEY);

    // Task 4: reads + prints the Zomato variables.
    readZomatoConfig();
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "3rem", lineHeight: 1.6 }}>
      <h1>Spotify Playlist Viewer</h1>
      <p>Environment setup demo — Session 3.</p>
      <p>
        <strong>NEXT_PUBLIC_SPOTIFY_API_KEY:</strong>{" "}
        <code>{process.env.NEXT_PUBLIC_SPOTIFY_API_KEY ?? "(not set)"}</code>
      </p>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Open your terminal and the browser console to see this value logged in both places.
      </p>
    </main>
  );
}
