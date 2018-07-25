import { setupRequest } from "../types";

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
