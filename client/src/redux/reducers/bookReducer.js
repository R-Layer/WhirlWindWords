import { fetchBooksProcess } from "../types";

export const bookReducer = (state = [], action) => {
  switch (action.type) {
    case fetchBooksProcess.REFRESH:
      return action.books;
    case fetchBooksProcess.ADDITION:
      return [...state, action.newBook.bookCreated];
    case fetchBooksProcess.REMOVAL:
      return state.filter(book => book._id !== action.delOp._id);
    case fetchBooksProcess.UPDATE:
      return state;
    default:
      return state;
  }
};
