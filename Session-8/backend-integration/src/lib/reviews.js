// Tasks 2 & 4: Firestore helpers for the "reviews" collection.

import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const reviewsRef = collection(db, "reviews");

// Task 2: add a new restaurant review with addDoc().
export async function addReview({ restaurant, rating, comment }) {
  const docRef = await addDoc(reviewsRef, {
    restaurant,
    rating: Number(rating),
    comment,
    createdAt: Date.now(),
  });
  return docRef.id;
}

// Fetch all reviews as an array of { id, restaurant, rating, comment }.
export async function getReviews() {
  const snapshot = await getDocs(reviewsRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Task 4: update an existing review's rating + comment with updateDoc().
export async function updateReview(id, { rating, comment }) {
  const ref = doc(db, "reviews", id);
  await updateDoc(ref, { rating: Number(rating), comment });
}
