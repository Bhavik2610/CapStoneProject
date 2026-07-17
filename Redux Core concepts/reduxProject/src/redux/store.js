// Task 3: create the store with createStore, initialized with playlistReducer.
//
// Note: createStore is deprecated in Redux 5 (modern apps use configureStore
// from @reduxjs/toolkit). It still works — we use it because the task asks
// for createStore specifically.

import { createStore } from "redux";
import playlistReducer from "./playlistReducer";

const store = createStore(playlistReducer);

export default store;
