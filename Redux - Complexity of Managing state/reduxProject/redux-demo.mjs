// Task 3 (runnable): `npm run demo`  (or: node redux-demo.mjs)
//
// Self-contained so it runs with plain Node, demonstrating the store outside
// of React.

import { createStore } from "redux";

const ADD_SONG = "ADD_SONG";
const REMOVE_SONG = "REMOVE_SONG";
const addSong = (name) => ({ type: ADD_SONG, payload: name });
const removeSong = (name) => ({ type: REMOVE_SONG, payload: name });

function playlistReducer(state = [], action) {
  switch (action.type) {
    case ADD_SONG:
      return [...state, action.payload];
    case REMOVE_SONG:
      return state.filter((song) => song !== action.payload);
    default:
      return state;
  }
}

const store = createStore(playlistReducer);

console.log("Initial state:", store.getState());

store.dispatch(addSong("Kesariya"));
store.dispatch(addSong("Shape of You"));
console.log("After adding two songs:", store.getState());

store.dispatch(removeSong("Kesariya"));
console.log("After removing Kesariya:", store.getState());
