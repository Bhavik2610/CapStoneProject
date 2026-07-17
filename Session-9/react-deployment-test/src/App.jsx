export default function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        background: "#0f172a",
        color: "#fff",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      {/* Task 1 requires this exact text on the homepage */}
      <h1 style={{ fontSize: "2.5rem", margin: 0 }}>React Deployment Test</h1>
      <p style={{ color: "#94a3b8", marginTop: "0.75rem" }}>
        Deployed successfully with Vite + React.
      </p>
    </main>
  );
}
