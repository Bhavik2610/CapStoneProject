// Task 1: cartReducer manages an array of cart items.

import { ADD_TO_CART, REMOVE_FROM_CART } from "./cartActions";

const initialState = [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      // Don't add the same product twice.
      if (state.some((item) => item.id === action.payload.id)) return state;
      return [...state, action.payload];

    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload);

    default:
      return state;
  }
}
