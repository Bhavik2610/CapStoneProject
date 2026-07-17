// Cart actions.

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// Task 2: addToCart carries the whole product object as payload.
export function addToCart(product) {
  return { type: ADD_TO_CART, payload: product };
}

// removeFromCart carries just the id of the product to remove.
export function removeFromCart(id) {
  return { type: REMOVE_FROM_CART, payload: id };
}
