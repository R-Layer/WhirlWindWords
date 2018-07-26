import { setupRequest, fetchRequestProcess } from "../types";

const initState = { own: {}, ext: {}, active: false };
export const requestStatusReducer = (state = initState, action) => {
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

export const requestFetchReducer = (state = [], action) => {
  switch (action.type) {
    case fetchRequestProcess.REFRESH:
      return action.requests;
    case fetchRequestProcess.CREATION:
      return [...action.requests, action.requestCreated];
    case fetchRequestProcess.REJECT:
      return state.filter(
        request => request._id !== action.requestRejected._id
      );
    case fetchRequestProcess.ACCEPT:
      return state;
    default:
      return state;
  }
};
