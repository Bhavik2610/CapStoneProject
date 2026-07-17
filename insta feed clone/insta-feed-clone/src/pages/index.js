import { useEffect } from "react";

// Task 3 (server side): logs in the terminal running `npm run dev` during SSR.
console.log("[server] NEXT_PUBLIC_MAPS_API_KEY =", process.env.NEXT_PUBLIC_MAPS_API_KEY);

export default function Home() {
  useEffect(() => {
    // Task 3 (client side): logs in the browser DevTools console.
    console.log("[client] NEXT_PUBLIC_MAPS_API_KEY =", process.env.NEXT_PUBLIC_MAPS_API_KEY);
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "3rem", lineHeight: 1.6 }}>
      <h1>insta-feed-clone</h1>
      <p>Environment setup demo — Session 3.</p>
      <p>
        <strong>NEXT_PUBLIC_MAPS_API_KEY:</strong>{" "}
        <code>{process.env.NEXT_PUBLIC_MAPS_API_KEY ?? "(not set)"}</code>
      </p>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Check both your terminal and the browser console to see it logged in each.
      </p>
    </main>
  );
}
