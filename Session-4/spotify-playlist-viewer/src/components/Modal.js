import { useEffect } from "react";
import styles from "@/styles/Modal.module.css";

// Task 4: A reusable Modal.
//
// Props:
//   isOpen   -> boolean, controlled by the PARENT's state (that's the hint:
//               state lives in the parent, visibility is passed down).
//   onClose  -> function passed down from the parent to close the modal.
//   title    -> heading text shown in the modal header.
//   children -> whatever content you want inside (here: the Book Ticket form).
//
// Closing happens three ways: the × button, clicking the dark overlay
// (outside the modal box), and pressing Escape.

export default function Modal({ isOpen, onClose, title, children }) {
  // Close on Escape key, and lock background scroll while open.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    // Cleanup when the modal closes or the component unmounts.
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Render nothing at all when closed.
  if (!isOpen) return null;

  return (
    // Clicking the overlay closes the modal...
    <div className={styles.overlay} onClick={onClose}>
      {/* ...but clicks INSIDE the box are stopped so they don't bubble up
          to the overlay and accidentally close it. */}
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.close} onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
