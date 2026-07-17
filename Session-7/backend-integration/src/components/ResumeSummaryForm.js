import { useState } from "react";
import Spinner from "@/components/Spinner";

// Task 2: enter resume details, get a 2-line summary from OpenAI (via
// /api/resume-summary), with a loading spinner while waiting.
// Task 5: shows a clear error message if the API call fails.

export default function ResumeSummaryForm() {
  const [details, setDetails] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSummary("");

    if (!details.trim()) {
      setError("Please enter your resume details first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/resume-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ details }),
      });
      const data = await res.json();

      // Task 5: any non-OK response (bad key, rate limit, network) becomes
      // a friendly on-screen message instead of a silent failure.
      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong generating the summary.");
      }
      setSummary(data.summary);
    } catch (err) {
      // Network failures (fetch throws) also land here.
      setError(err.message || "Network error — please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={styles.card}>
      <h2 style={styles.h2}>Resume Summary Generator</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          style={styles.textarea}
          rows={5}
          placeholder="Paste your resume details here (experience, skills, roles…)"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Generating…" : "Generate summary"}
        </button>
      </form>

      {loading && <div style={{ marginTop: "1rem" }}><Spinner /></div>}

      {/* Task 5: error message */}
      {error && (
        <div style={styles.errorBox}>
          <strong>Couldn’t generate summary.</strong>
          <div>{error}</div>
        </div>
      )}

      {summary && !loading && (
        <div style={styles.result}>
          <strong>Summary</strong>
          <p style={{ margin: "0.5rem 0 0" }}>{summary}</p>
        </div>
      )}
    </section>
  );
}

const styles = {
  card: { background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" },
  h2: { marginTop: 0 },
  form: { display: "grid", gap: "0.75rem" },
  textarea: { padding: "0.7rem 0.85rem", borderRadius: 8, border: "1px solid #ccc", fontFamily: "inherit", fontSize: "0.95rem", resize: "vertical" },
  button: { padding: "0.6rem 1rem", border: "none", borderRadius: 8, background: "#2874f0", color: "#fff", fontWeight: 700, cursor: "pointer", justifySelf: "start" },
  result: { marginTop: "1rem", padding: "1rem", background: "#eef5ff", borderRadius: 8 },
  errorBox: { marginTop: "1rem", padding: "0.85rem 1rem", background: "#fdecec", color: "#c0392b", borderRadius: 8, fontSize: "0.9rem" },
};
