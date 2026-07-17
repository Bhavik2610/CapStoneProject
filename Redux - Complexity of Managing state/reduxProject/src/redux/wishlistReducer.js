// Task 3: wishlistReducer manages a separate array of wishlist items.

import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "./wishlistActions";

const initialState = [];

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      if (state.some((item) => item.id === action.payload.id)) return state;
      return [...state, action.payload];

    case REMOVE_FROM_WISHLIST:
      return state.filter((item) => item.id !== action.payload);

    default:
      return state;
  }
}
