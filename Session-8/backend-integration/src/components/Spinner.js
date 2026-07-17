import styles from "@/styles/Spinner.module.css";

// A small loading spinner (used while AI responses are in flight).
export default function Spinner({ label = "Generating…" }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.spinner} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
