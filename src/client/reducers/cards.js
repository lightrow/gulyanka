import fetch from "cross-fetch";
import { showErrorPopup } from "./errorpopup";

const UPDATE_CARD = "cards/UPDATE_CARD ";
const FILL_CARDS_STORE = "cards/FILL_CARDS_STORE";
const CARD_UPDATED = "cards/CARD_UPDATED";
const EMPTY_CARDS = "cards/EMPTY_CARDS";
const SAVE_IMAGE = "cards/SAVE_IMAGE";
const SAVE_GOERS = "cards/SAVE_GOERS";
const GETTING_GOERS = "cards/GETTING_GOERS";
const INVALIDATE_GOERS = "cards/INVALIDATE_GOERS";
const SENDING_WILL_GO = "cards/SENDING_WILL_GO";
const SENT_WILL_GO = "cards/SENT_WILL_GO";

export const updateCard = obj => {
  return {
    type: UPDATE_CARD,
    key: obj.key,
    payload: obj.payload
  };
};

export const invalidateGoers = key => {
  return {
    type: INVALIDATE_GOERS,
    key
  };
};

export const sendWillGo = obj => {
  return dispatch => {
    dispatch({ type: SENDING_WILL_GO, key: obj.key });
    fetch(`/api/willgo?q=${obj.placeId}`)
      .then(res => res.json())
      .then(res => {
        if (res.status == 403) {
          dispatch(showErrorPopup("LOGIN_ERROR"));
          dispatch({ type: SENT_WILL_GO, key: obj.key });
        } else {
          dispatch(showErrorPopup("SUBMITTED"));
          dispatch({ type: SENT_WILL_GO, key: obj.key });
        }
        dispatch(getGoers(obj));
      });
  };

  return {
    type: UPDATE_CARD,
    key: obj.key,
    payload: obj.payload
  };
};

export const saveImage = obj => {
  return {
    type: SAVE_IMAGE,
    payload: obj
  };
};

export const saveGoers = obj => {
  return {
    type: SAVE_GOERS,
    payload: obj
  };
};

export const gettingGoers = key => {
  return {
    type: GETTING_GOERS,
    payload: key
  };
};

export const cardUpdated = obj => {
  return {
    type: CARD_UPDATED,
    payload: obj
  };
};

export const getGoers = obj => {
  return dispatch => {
    dispatch(gettingGoers(obj.key));
    fetch(`/api/getgoers?q=${obj.placeId}`)
      //.then(handleErrors)
      .then(res => res.json())
      .then(res => {
        if (res.status == 200) {
          dispatch(saveGoers({ key: obj.key, goers: res.goers }));
        } else {
          console.log("LOLSLSLSLSL");
          dispatch(saveGoers({ key: obj.key, goers: [] }));
        }
      });
    //.catch(error => console.log(error));
  };
};

function handleErrors(response) {
  if (!response.ok) {
    console.log(response);
    throw Error(response.statusText);
  }
  return response;
}

const initialState = {
  0: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_CARD:
      return {
        ...state,
        [action.key]: action.payload
      };
    case CARD_UPDATED:
      return {
        ...state,
        [action.payload.key]: { ...state[action.payload.key], updated: true }
      };
    case FILL_CARDS_STORE:
      let newState = JSON.parse(JSON.stringify(state));
      action.payload.forEach((entry, index) => {
        newState[index] = entry;
      });
      return {
        ...state,
        ...newState
      };
    case EMPTY_CARDS:
      let emptyState = { 1: {} };
      return {
        ...emptyState
      };
    case SAVE_IMAGE:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          img: action.payload.img
        }
      };
    case GETTING_GOERS:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          gettingGoers: true,
          goersValid: false
        }
      };
    case SAVE_GOERS:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          goers: action.payload.goers,
          gettingGoers: false,
          goersValid: true
        }
      };
    case INVALIDATE_GOERS:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          goersValid: false
        }
      };
    case SENDING_WILL_GO:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          sendingWillGo: true
        }
      };
    case SENT_WILL_GO:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          sendingWillGo: false
        }
      };
    default:
      return state;
  }
};
