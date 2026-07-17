// Store setup covering three concepts at once:
//   Task 3 - combineReducers (multiple independent state slices)
//   Task 4 - applyMiddleware(thunk) (async actions)
//   Task 5 - Redux DevTools Extension hookup

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

import playlistReducer from "./playlistReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import offersReducer from "./offersReducer";

// Task 3: each key becomes a slice of the overall state tree, e.g.
// state.cart, state.wishlist, state.offers, state.playlist.
const rootReducer = combineReducers({
  playlist: playlistReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  offers: offersReducer,
});

// Task 5: if the Redux DevTools browser extension is installed, use its
// compose so we can inspect state/time-travel. Otherwise fall back to
// plain compose.
const composeEnhancers =
  (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Task 4: applyMiddleware(thunk) lets us dispatch async action creators.
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
