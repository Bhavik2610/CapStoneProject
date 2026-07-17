// The reducer takes the current state (the playlist array) and an action,
// and returns the NEW state. It must be pure: never mutate the old array,
// always return a new one.

import { ADD_SONG, REMOVE_SONG } from "./playlistActions";

const initialState = []; // playlist starts empty

export default function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SONG:
      // Task 2: return a NEW array with the added song (spread, not push).
      return [...state, action.payload];

    case REMOVE_SONG:
      // Task 5 (hint): filter out the song whose name matches the payload.
      return state.filter((song) => song !== action.payload);

    default:
      return state;
  }
}
