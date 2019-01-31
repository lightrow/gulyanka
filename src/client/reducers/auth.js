const SAVE_REQ_TOKEN = "auth/SAVE_REQ_TOKEN";
const SAVE_AUTH = "auth/SAVE_AUTH";
const SAVE_AUTH_DATA = "auth/SAVE_AUTH_DATA";
const LOGOUT = "auth/LOGOUT";
import { showErrorPopup } from "./errorpopup";

export const saveAuthData = authData => {
  return dispatch => {
    dispatch({ type: SAVE_AUTH_DATA, authData });
    dispatch(showErrorPopup("LOGIN_SUCCESS"));
  };
};

export const login = () => {
  return dispatch => {
    let es = new EventSource("/api/authsse");
    let strWindowFeatures =
      "menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=900,height=500";
    let popup = window.open("", "_blank");
    popup.location.href = "http://" + window.location.host + "/api/auth";
    es.onmessage = event => {
      let data = JSON.parse(event.data);
      if (data != "nothing here") {
        dispatch(saveAuthData(JSON.parse(event.data)));
      }
    };
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT
    });
  };
};

export const getReqToken = () => {
  return dispatch => {
    fetch("/api/auth")
      .then(res => res.json())
      .then(res => {
        if (res.message == "OK") {
          dispatch({ type: SAVE_REQ_TOKEN, payload: res.reqToken });
        }
      });
  };
};

export const authorize = accToken => {
  return dispatch => {
    fetch("/api/verify")
      .then(res => res.json())
      .then(res => {
        if (res.message == "OK") {
          dispatch({
            type: SAVE_AUTH,
            payload: { res }
          });
        }
      });
  };
};

const initialState = {
  loggedIn: false,
  tokenAcquired: false,
  reqToken: "",
  authData: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_REQ_TOKEN:
      return {
        ...state,
        reqToken: action.payload,
        tokenAcquired: true
      };
    case SAVE_AUTH:
      return {
        ...state,
        authData: action.payload
      };
    case SAVE_AUTH_DATA:
      return {
        ...state,
        authData: action.authData,
        loggedIn: true
      };
    case LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
