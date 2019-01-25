import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import input from "./input";
import loader from "./loader";
import query from "./query";
import auth from "./auth";
import expander from "./expander";
import cards from "./cards";

const appReducer = combineReducers({
  router: routerReducer,
  loader,
  input,
  query,
  auth,
  expander,
  cards
});

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
