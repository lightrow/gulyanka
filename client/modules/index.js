import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import loader from "./loader";
import auth from "./auth";

const appReducer = combineReducers({
  router: routerReducer,
  loader,
  auth
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
