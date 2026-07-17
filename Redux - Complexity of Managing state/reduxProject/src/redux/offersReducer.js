// Task 4: offersReducer tracks loading state and the fetched offers.

import { FETCH_OFFERS_START, FETCH_OFFERS_SUCCESS } from "./offersActions";

const initialState = {
  loading: false,
  items: [],
};

export default function offersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_OFFERS_START:
      return { ...state, loading: true };

    case FETCH_OFFERS_SUCCESS:
      return { loading: false, items: action.payload };

    default:
      return state;
  }
}
