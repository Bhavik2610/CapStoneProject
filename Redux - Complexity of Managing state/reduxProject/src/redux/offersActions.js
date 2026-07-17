// Offers actions, including an async action (thunk) for Task 4.

export const FETCH_OFFERS_START = "FETCH_OFFERS_START";
export const FETCH_OFFERS_SUCCESS = "FETCH_OFFERS_SUCCESS";

export function fetchOffersStart() {
  return { type: FETCH_OFFERS_START };
}

export function fetchOffersSuccess(offers) {
  return { type: FETCH_OFFERS_SUCCESS, payload: offers };
}

// Task 4: fetchOffers is a THUNK — an action creator that returns a function
// (instead of a plain object). redux-thunk lets us dispatch it. The function
// receives `dispatch`, so we can dispatch multiple actions over time —
// here, one when the "request" starts and one when it "finishes".
export function fetchOffers() {
  return (dispatch) => {
    dispatch(fetchOffersStart()); // flip loading = true

    // Hint: setTimeout mocks an API call that takes ~1.5s.
    setTimeout(() => {
      const fakeOffers = [
        "10% off electronics",
        "Buy 1 Get 1 on books",
        "Free shipping over $50",
      ];
      dispatch(fetchOffersSuccess(fakeOffers)); // store the result
    }, 1500);
  };
}
