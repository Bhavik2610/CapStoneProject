// Task 3: Firestore helper for the "watchlists" collection.

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const watchlistsRef = collection(db, "watchlists");

// Fetch all watchlist items as { id, movie, watched }.
export async function getWatchlist() {
  const snapshot = await getDocs(watchlistsRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Convenience seeder so you have some movies to display.
export async function seedSampleWatchlist() {
  const samples = [
    { movie: "Inception", watched: true },
    { movie: "Dune: Part Two", watched: false },
    { movie: "3 Idiots", watched: true },
    { movie: "Oppenheimer", watched: false },
  ];
  await Promise.all(samples.map((item) => addDoc(watchlistsRef, item)));
}
