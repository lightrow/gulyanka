import fetch from 'cross-fetch';

const UPDATE_CARD = "cards/UPDATE_CARD ";
const FILL_CARDS_STORE = "cards/FILL_CARDS_STORE";
const CARD_UPDATED = "cards/CARD_UPDATED";
const EMPTY_CARDS = "cards/EMPTY_CARDS";
const SAVE_IMAGE = "cards/SAVE_IMAGE";
const SAVE_GOERS = "cards/SAVE_GOERS";

export const updateCard = obj => {
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

export const cardUpdated = obj => {

  return {
    type: CARD_UPDATED,
    payload: obj
  };
};

export const getImages = obj => {
  return dispatch => {
    return fetch(`/api/getplaces?city=${obj.placeId}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(res => {
        if (res.status == 200) {
          dispatch(saveGoers({ key: obj.key, goers: res.goers }));
        }
      })
      //.catch(error => console.log(error));
  };
};


export const getGoers = obj => {
  return dispatch => {
    fetch(`/api/getgoers?q=${obj.placeId}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(res => {
        if (res.status == 200) {
          dispatch(saveGoers({ key: obj.key, goers: res.goers }));
        }
      })
      //.catch(error => console.log(error));
  };
};

function handleErrors(response) {
  if (!response.ok) {
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
    case SAVE_GOERS:
    return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          goers: action.payload.goers
        }
      };
    default:
      return state;
  }
};
