import { useEffect, useState } from "react";
import { addReview, getReviews, updateReview } from "@/lib/reviews";

// Tasks 2 & 4: add restaurant reviews and edit existing ones.
export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---- new-review form state (Task 2) ----
  const [form, setForm] = useState({ restaurant: "", rating: "", comment: "" });
  const [submitting, setSubmitting] = useState(false);

  // ---- edit state (Task 4): which review is being edited + its draft ----
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState({ rating: "", comment: "" });

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setReviews(await getReviews());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Task 2: save a new review with addDoc (inside reviews helper), then refresh.
  async function handleAdd(e) {
    e.preventDefault();
    if (!form.restaurant || !form.rating) return;
    setSubmitting(true);
    try {
      await addReview(form);
      setForm({ restaurant: "", rating: "", comment: "" });
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // Task 4: open the inline editor for a review, pre-filled with its values.
  function startEdit(review) {
    setEditingId(review.id);
    setEditDraft({ rating: review.rating, comment: review.comment });
  }

  // Task 4: save edits with updateDoc, then update the UI immediately.
  async function saveEdit(id) {
    try {
      await updateReview(id, editDraft);
      // Update local state so the list reflects the change without a full refetch.
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...editDraft, rating: Number(editDraft.rating) } : r))
      );
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main style={styles.page}>
      <h1>Restaurant Reviews</h1>

      {/* Task 2: add-review form */}
      <form onSubmit={handleAdd} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Restaurant name"
          value={form.restaurant}
          onChange={(e) => setForm({ ...form, restaurant: e.target.value })}
        />
        <input
          style={styles.input}
          type="number" min="1" max="5"
          placeholder="Rating (1–5)"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        />
        <textarea
          style={styles.input}
          placeholder="Comment"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
        />
        <button type="submit" disabled={submitting} style={styles.primary}>
          {submitting ? "Saving…" : "Add review"}
        </button>
      </form>

      {loading && <p>Loading…</p>}
      {error && <p style={styles.error}>Error: {error}</p>}

      {/* List + inline edit (Task 4) */}
      <ul style={styles.list}>
        {reviews.map((r) => (
          <li key={r.id} style={styles.card}>
            {editingId === r.id ? (
              <div style={styles.editBox}>
                <input
                  style={styles.input}
                  type="number" min="1" max="5"
                  value={editDraft.rating}
                  onChange={(e) => setEditDraft({ ...editDraft, rating: e.target.value })}
                />
                <textarea
                  style={styles.input}
                  value={editDraft.comment}
                  onChange={(e) => setEditDraft({ ...editDraft, comment: e.target.value })}
                />
                <div style={styles.rowGap}>
                  <button onClick={() => saveEdit(r.id)} style={styles.primary}>Save</button>
                  <button onClick={() => setEditingId(null)} style={styles.ghost}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div style={styles.cardHead}>
                  <strong>{r.restaurant}</strong>
                  <span>{"★".repeat(r.rating)}<span style={{ color: "#ccc" }}>{"★".repeat(5 - r.rating)}</span></span>
                </div>
                <p style={{ margin: "0.4rem 0" }}>{r.comment}</p>
                <button onClick={() => startEdit(r)} style={styles.ghost}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

const styles = {
  page: { fontFamily: "system-ui, sans-serif", maxWidth: 560, margin: "0 auto", padding: "2rem 1.5rem" },
  form: { display: "grid", gap: "0.6rem", marginBottom: "1.5rem" },
  input: { padding: "0.6rem 0.75rem", border: "1px solid #d5d5d5", borderRadius: 8, fontSize: "0.95rem", fontFamily: "inherit" },
  primary: { padding: "0.6rem 1rem", border: "none", borderRadius: 8, background: "#2874f0", color: "#fff", fontWeight: 700, cursor: "pointer" },
  ghost: { padding: "0.45rem 0.9rem", border: "1px solid #ccc", borderRadius: 8, background: "#fff", cursor: "pointer" },
  list: { listStyle: "none", padding: 0, display: "grid", gap: "0.75rem" },
  card: { background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: "1rem" },
  cardHead: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  editBox: { display: "grid", gap: "0.5rem" },
  rowGap: { display: "flex", gap: "0.5rem" },
  error: { color: "#c0392b" },
};
