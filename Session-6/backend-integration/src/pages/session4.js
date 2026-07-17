import { useState } from "react";
import Navbar from "@/components/Navbar";
import PlaylistCard from "@/components/PlaylistCard";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import Form from "@/components/Form";

// ---- Data passed into components as props (kept out of the components) ----

const PLAYLISTS = [
  { id: 1, name: "Chill Vibes", songCount: 42, image: "https://picsum.photos/seed/chill/300" },
  { id: 2, name: "Workout Mix", songCount: 28, image: "https://picsum.photos/seed/workout/300" },
  { id: 3, name: "Focus Flow", songCount: 65, image: "https://picsum.photos/seed/focus/300" },
];

const SOCIAL_LINKS = [
  { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
  { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
  { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
  { name: "YouTube", url: "https://youtube.com", icon: "youtube" },
];

// Field definitions for the Book Ticket form (BookMyShow-style).
const TICKET_FIELDS = [
  { name: "movie", label: "Movie", type: "select", required: true,
    placeholder: "Pick a movie",
    options: ["Inception", "Interstellar", "Jawan", "3 Idiots"] },
  { name: "seats", label: "Number of seats", type: "number", required: true, placeholder: "e.g. 2" },
  { name: "date", label: "Date", type: "date", required: true },
];

// Field definitions for the IPL fantasy Sign Up form (Task 5 customization).
const SIGNUP_FIELDS = [
  { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Rohit Sharma" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
  { name: "username", label: "Username", type: "text", required: true, placeholder: "captain_cool" },
  { name: "password", label: "Password", type: "password", required: true, placeholder: "••••••••" },
  { name: "favTeam", label: "Favourite IPL Team", type: "select", required: true,
    placeholder: "Choose your team",
    options: ["Mumbai Indians", "Chennai Super Kings", "RCB", "KKR", "Gujarat Titans"] },
  { name: "age", label: "Age", type: "number", required: false, placeholder: "18" },
];

export default function Session4Demo() {
  // Task 4 hint: the modal's visibility state lives HERE, in the parent.
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  const handleBookTicket = (values) => {
    alert("Ticket booked!\n" + JSON.stringify(values, null, 2));
    setIsTicketOpen(false);
  };

  const handleSignUp = (values) => {
    alert("Welcome to the league!\n" + JSON.stringify(values, null, 2));
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#fafafa", minHeight: "100vh" }}>
      {/* Task 1 — Navbar with active link highlighted via prop */}
      <Navbar active="Orders" />

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Task 2 — three PlaylistCards rendered from data */}
        <section>
          <h2>Your Playlists</h2>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", background: "#121212", padding: 20, borderRadius: 16 }}>
            {PLAYLISTS.map((p) => (
              <PlaylistCard key={p.id} image={p.image} name={p.name} songCount={p.songCount} />
            ))}
          </div>
        </section>

        {/* Task 4 — button opens the Modal containing a Book Ticket form */}
        <section style={{ marginTop: "2.5rem" }}>
          <h2>Book a Ticket</h2>
          <button
            onClick={() => setIsTicketOpen(true)}
            style={{ padding: "0.7rem 1.2rem", border: "none", borderRadius: 8,
                     background: "#e23744", color: "#fff", fontWeight: 700, cursor: "pointer" }}
          >
            Book Ticket
          </button>
        </section>

        {/* Task 5 — IPL fantasy Sign Up built from the generic Form */}
        <section style={{ marginTop: "2.5rem", maxWidth: 420 }}>
          <h2>IPL Fantasy — Sign Up</h2>
          <div style={{ background: "#fff", padding: "1.5rem", borderRadius: 14, border: "1px solid #eee" }}>
            <Form fields={SIGNUP_FIELDS} onSubmit={handleSignUp} submitLabel="Join the League" />
          </div>
        </section>
      </main>

      {/* Task 3 — Footer with social links passed as props */}
      <Footer socialLinks={SOCIAL_LINKS} />

      {/* The Modal itself: same generic Form reused for the ticket booking */}
      <Modal isOpen={isTicketOpen} onClose={() => setIsTicketOpen(false)} title="Book Ticket">
        <Form fields={TICKET_FIELDS} onSubmit={handleBookTicket} submitLabel="Confirm Booking" />
      </Modal>
    </div>
  );
}
