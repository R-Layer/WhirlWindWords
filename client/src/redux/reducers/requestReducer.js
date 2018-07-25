import { setupRequest } from "../types";

const initState = { own: {}, ext: {}, active: false };
export const requestReducer = (state = initState, action) => {
  switch (action.type) {
    case setupRequest.SELECTED_EXT:
      return Object.assign({}, state, { ext: action.book });
    case setupRequest.SELECTED_OWN:
      return Object.assign({}, state, { own: action.book });
    case setupRequest.CLEAR_SETUP:
      return Object.assign({}, state, { [action.bookToClear]: {} });
    default:
      return state;
  }
};
