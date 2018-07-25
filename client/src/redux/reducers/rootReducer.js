import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { bookReducer } from "./bookReducer";
import { requestReducer } from "./requestReducer";
import { errors } from "./errorReducer";

export const rootReducer = combineReducers({
  authState: userReducer,
  bookState: bookReducer,
  requestState: requestReducer,
  errors
});
