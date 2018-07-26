import {
  setupRequest,
  fetchRequestProcess,
  failProcess,
  loginProcess
} from "../types";
import jwt_decode from "jwt-decode";

export const selectExtAction = book => ({
  type: setupRequest.SELECTED_EXT,
  book
});

export const selectOwnAction = book => ({
  type: setupRequest.SELECTED_OWN,
  book
});

export const clearAction = bookToClear => ({
  type: setupRequest.CLEAR_SETUP,
  bookToClear
});

export const createRequestAction = (bookIn, bookOut) => dispatch => {
  const requestOptions = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ bookIn, bookOut })
  };

  if (localStorage.authToken) {
    requestOptions.headers.authorization = localStorage.authToken;
    const { exp } = jwt_decode(localStorage.authToken);

    if (exp * 1000 < Date.now()) {
      return dispatch({ type: loginProcess.LOGOUT });
    }
  }

  return fetch("/api/requests/submit", requestOptions)
    .then(res => res.json())
    .then(requestCreated => {
      if (requestCreated.err) {
        return dispatch({ type: failProcess.ERRORS, err: requestCreated.err });
      } else {
        return dispatch({ type: fetchRequestProcess.CREATION, requestCreated });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};
