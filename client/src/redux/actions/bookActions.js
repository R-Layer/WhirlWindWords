import jwt_decode from "jwt-decode";
import { fetchBooksProcess, failProcess, loginProcess } from "../types";

export const getBooksAction = () => dispatch => {
  const requestOptions = {
    method: "GET",
    headers: { "content-type": "application/json" }
  };

  return fetch("/api/books", requestOptions)
    .then(res => res.json())
    .then(books => dispatch({ type: fetchBooksProcess.REFRESH, books }))
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const insertBookAction = bookInfo => dispatch => {
  const requestOptions = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(bookInfo)
  };

  if (localStorage.authToken) {
    requestOptions.headers.authorization = localStorage.authToken;

    const { exp } = jwt_decode(localStorage.authToken);

    if (exp * 1000 < Date.now()) {
      return dispatch({ type: loginProcess.LOGOUT });
    }
  }
  return fetch("/api/books/insert", requestOptions)
    .then(res => res.json())
    .then(newBook => {
      if (newBook.err) {
        return dispatch({ type: failProcess.ERRORS, err: newBook.err });
      }
      return dispatch({ type: fetchBooksProcess.ADDITION, newBook });
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const removeBookAction = bookTitle => dispatch => {
  const requestOptions = {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(bookTitle)
  };

  if (localStorage.authToken) {
    requestOptions.headers.authorization = localStorage.authToken;
    const { exp } = jwt_decode(localStorage.authToken);

    if (exp * 1000 < Date.now()) {
      return dispatch({ type: loginProcess.LOGOUT });
    }
  }

  return fetch("/api/books/remove", requestOptions)
    .then(res => res.json())
    .then(delOp => {
      if (delOp.err) {
        return dispatch({ type: failProcess.ERRORS, err: delOp.err });
      }
      return dispatch({ type: fetchBooksProcess.REMOVAL, delOp });
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const updateBookAction = (bookInfo, bookId) => dispatch => {
  const requestOptions = {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(bookInfo)
  };

  if (localStorage.authToken) {
    requestOptions.headers.authorization = localStorage.authToken;
    const { exp } = jwt_decode(localStorage.authToken);

    if (exp * 1000 < Date.now()) {
      return dispatch({ type: loginProcess.LOGOUT });
    }
  }

  return fetch(`/api/books/modify/${bookId}`, requestOptions)
    .then(res => res.json())
    .then(updBook => {
      if (updBook.err) {
        return dispatch({ type: failProcess.ERRORS, err: updBook.err });
      } else {
        return dispatch({ type: fetchBooksProcess.UPDATE, updBook });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};
