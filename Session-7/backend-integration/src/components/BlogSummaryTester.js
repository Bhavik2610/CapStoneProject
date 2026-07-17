import { useState } from "react";
import Spinner from "@/components/Spinner";
import { fetchBlogSummary } from "@/lib/ai";

// Task 4: test fetchBlogSummary(prompt) with any prompt (try at least two).
export default function BlogSummaryTester() {
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function run() {
    setError(null);
    setSummary("");
    setLoading(true);
    try {
      setSummary(await fetchBlogSummary(prompt));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={styles.card}>
      <h2 style={styles.h2}>Blog Summary (fetchBlogSummary)</h2>
      <div style={styles.row}>
        <input
          style={styles.input}
          placeholder='e.g. "the benefits of remote work"'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={run} disabled={loading || !prompt.trim()} style={styles.button}>
          {loading ? "…" : "Summarize"}
        </button>
      </div>

      {loading && <div style={{ marginTop: "1rem" }}><Spinner /></div>}
      {error && <p style={styles.error}>{error}</p>}
      {summary && !loading && <p style={styles.result}>{summary}</p>}
    </section>
  );
}

const styles = {
  card: { background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" },
  h2: { marginTop: 0 },
  row: { display: "flex", gap: "0.5rem" },
  input: { flex: 1, padding: "0.6rem 0.75rem", borderRadius: 8, border: "1px solid #ccc", fontSize: "0.95rem" },
  button: { padding: "0.6rem 1rem", border: "none", borderRadius: 8, background: "#7c3aed", color: "#fff", fontWeight: 700, cursor: "pointer" },
  result: { marginTop: "1rem", padding: "1rem", background: "#f5f3ff", borderRadius: 8 },
  error: { color: "#c0392b", marginTop: "0.75rem" },
};
