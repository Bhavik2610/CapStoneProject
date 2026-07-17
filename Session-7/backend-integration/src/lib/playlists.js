// Task 1: Firestore helpers for the "playlists" collection.
//
// Note: in Firestore you don't have to "create" a collection ahead of time.
// It springs into existence the moment you write the first document to it.
// So seedSamplePlaylist() below effectively creates the "playlists"
// collection with one sample document.

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const playlistsRef = collection(db, "playlists");

// Add a playlist: name (string) + songs (array of song title strings).
export async function addPlaylist(name, songs) {
  const docRef = await addDoc(playlistsRef, { name, songs });
  return docRef.id;
}

// Fetch every playlist as an array of { id, name, songs }.
export async function getPlaylists() {
  const snapshot = await getDocs(playlistsRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Convenience: adds one sample playlist so you have data to look at.
export async function seedSamplePlaylist() {
  return addPlaylist("Road Trip Hits", [
    "Life is a Highway",
    "On the Road Again",
    "Highway to Hell",
  ]);
}
