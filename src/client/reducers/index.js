import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import input from "./input";
import loader from "./loader";
import query from "./query";
import auth from "./auth";
import expander from './expander'

const appReducer = combineReducers({
  router: routerReducer,
  loader,
  input,
  query,
  auth,
  expander
});

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
