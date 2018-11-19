import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import loader from "./loader";
import auth from "./auth";
import navbar from "./navbar";

const appReducer = combineReducers({
  router: routerReducer,
  loader,
  navbar,
  auth
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
 