import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import input from "./input";
import loader from "./loader";
import query from "./query";

const appReducer = combineReducers({
  router: routerReducer,
  loader,
  input,
  query,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
