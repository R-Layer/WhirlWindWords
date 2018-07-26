import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { bookReducer } from "./bookReducer";
import { requestStatusReducer, requestFetchReducer } from "./requestReducer";
import { errors } from "./errorReducer";

export const rootReducer = combineReducers({
  authState: userReducer,
  bookState: bookReducer,
  requestStatus: requestStatusReducer,
  requests: requestFetchReducer,
  errors
});
