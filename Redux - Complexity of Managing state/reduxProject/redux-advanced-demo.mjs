// Runnable check: `node redux-advanced-demo.mjs` (or `npm run demo:advanced`)
// Mirrors the real store to demonstrate combineReducers (Task 3) and the
// fetchOffers thunk (Task 4) with plain Node console output.

import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

// --- reducers ---
const cart = (s = [], a) =>
  a.type === "ADD_TO_CART" ? [...s, a.payload]
  : a.type === "REMOVE_FROM_CART" ? s.filter((i) => i.id !== a.payload)
  : s;

const wishlist = (s = [], a) =>
  a.type === "ADD_TO_WISHLIST" ? [...s, a.payload]
  : a.type === "REMOVE_FROM_WISHLIST" ? s.filter((i) => i.id !== a.payload)
  : s;

const offers = (s = { loading: false, items: [] }, a) =>
  a.type === "FETCH_OFFERS_START" ? { ...s, loading: true }
  : a.type === "FETCH_OFFERS_SUCCESS" ? { loading: false, items: a.payload }
  : s;

// Task 3: combine them
const root = combineReducers({ cart, wishlist, offers });

// Task 4: thunk middleware
const store = createStore(root, applyMiddleware(thunk));

// Task 4: async action creator
const fetchOffers = () => (dispatch) => {
  dispatch({ type: "FETCH_OFFERS_START" });
  setTimeout(() => {
    dispatch({ type: "FETCH_OFFERS_SUCCESS", payload: ["10% off electronics", "BOGO on books"] });
  }, 1500);
};

console.log("Initial combined state:", store.getState());

store.dispatch({ type: "ADD_TO_CART", payload: { id: 1, name: "Wireless Headphones", price: 79 } });
store.dispatch({ type: "ADD_TO_WISHLIST", payload: { id: 2, name: "Mechanical Keyboard", price: 119 } });
console.log("\nAfter add to cart + wishlist:", JSON.stringify(store.getState(), null, 2));

console.log("\nDispatching async fetchOffers() thunk…");
store.dispatch(fetchOffers());
console.log("offers.loading immediately:", store.getState().offers.loading);

setTimeout(() => {
  console.log("\nAfter offers resolve:", JSON.stringify(store.getState().offers, null, 2));
}, 1800);
