// Redux actions for the playlist.
//
// An "action" is a plain object describing WHAT happened. It always has a
// `type`, and usually a `payload` with the data. An "action creator" is a
// function that builds that object for you.

export const ADD_SONG = "ADD_SONG";
export const REMOVE_SONG = "REMOVE_SONG";

// Task 1: addSong takes a song name and returns an action object.
export function addSong(name) {
  return { type: ADD_SONG, payload: name };
}

// Task 5: removeSong takes a song name to delete.
export function removeSong(name) {
  return { type: REMOVE_SONG, payload: name };
}
