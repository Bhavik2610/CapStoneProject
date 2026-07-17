import { useState } from "react";
import Spinner from "@/components/Spinner";

// Tasks 1 & 3: fetch a motivational quote from Hugging Face (via /api/quote)
// on button click, with a tone selector that tunes the prompt (Task 3).

const TONES = ["inspirational", "funny", "serious"];

export default function AiQuoteGenerator() {
  const [tone, setTone] = useState("inspirational");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setQuote("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tone }), // Task 3: tone drives the prompt
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to generate quote.");
      setQuote(data.quote || "(the model returned an empty response — try again)");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={styles.card}>
      <h2 style={styles.h2}>AI Quote Generator</h2>

      <div style={styles.controls}>
        <label>
          Tone:{" "}
          <select value={tone} onChange={(e) => setTone(e.target.value)} style={styles.select}>
            {TONES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <button onClick={generate} disabled={loading} style={styles.button}>
          {loading ? "Generating…" : "Generate quote"}
        </button>
      </div>

      {loading && <Spinner />}
      {error && <p style={styles.error}>{error}</p>}
      {quote && !loading && <blockquote style={styles.quote}>{quote}</blockquote>}
    </section>
  );
}

const styles = {
  card: { background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" },
  h2: { marginTop: 0 },
  controls: { display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" },
  select: { padding: "0.4rem 0.6rem", borderRadius: 8, border: "1px solid #ccc" },
  button: { padding: "0.55rem 1rem", border: "none", borderRadius: 8, background: "#111", color: "#fff", fontWeight: 700, cursor: "pointer" },
  quote: { marginTop: "1rem", padding: "1rem", background: "#f6f6f6", borderLeft: "4px solid #111", borderRadius: 6, fontStyle: "italic" },
  error: { color: "#c0392b", marginTop: "0.75rem" },
};
