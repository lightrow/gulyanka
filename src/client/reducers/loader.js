import fetch from "cross-fetch";

const LOAD_START = "loader/LOAD_START";
const LOAD_END = "loader/LOAD_END";
const LOAD_SUCCESS = "loader/LOAD_SUCCESS";
const LOAD_FAIL = "loader/LOAD_FAIL";
const TYPING = "loader/TYPING";
const CARD_UPDATED = "loader/CARD_LOADED";
const UPDATE_CARD = "loader/UPDATE_CARD";
const CARDS_DISTRIBUTED = "loader/CARDS_DISTRIBUTED";
const CARDS_REDISTRIBUTE = "loader/CARDS_REDISTRIBUTE";

export const cardsDistributeDone = (cardStyles, distributorStyle) => {
  return dispatch => {
    dispatch({
      type: CARDS_DISTRIBUTED,
      payload: { cardStyles: cardStyles, distributorStyle: distributorStyle }
    });
  };
};

export const cardsRedistribute = () => {
  return dispatch => {
    dispatch({
      type: CARDS_REDISTRIBUTE
    });
  };
};

export const getData = location => {
  console.log("GETTING DATA");
  return dispatch => {
    dispatch(loadStart());
    fetch("/api/getplaces?city=" + location.toString())
      //.then(handleErrors)
      .then(response => response.json())
      .then(res => {
        switch (res.status) {
          case "ZERO_RESULTS":
            dispatch(loadFail("Nothing Found."));
            break;
          case "NO_INPUT":
            dispatch(loadFail("Nothing Entered."));
            break;
          default:
            dispatch(fillCardsStore(Array.from(res.results)));
            dispatch(loadSuccess(Array.from(res.results)));
            break;
        }
      })
      .catch(error => dispatch(loadFail(error)));
  };
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fillCardsStore = payload => {
  console.log("FILLING CARDS");
  return dispatch => {
    dispatch({
      type: "cards/FILL_CARDS_STORE",
      payload: payload
    });
  };
};

export const typingStart = () => {
  return dispatch => {
    dispatch({
      type: TYPING
    });
  };
};

export const loadStart = () => {
  return dispatch => {
    dispatch({
      type: "cards/EMPTY_CARDS"
    });
    dispatch({
      type: LOAD_START
    });
  };
};

export const loadEnd = () => {
  return dispatch => {
    dispatch({
      type: LOAD_END
    });
  };
};

export const loadSuccess = data => {
  return dispatch => {
    dispatch({
      type: LOAD_SUCCESS,
      payload: data
    });
  };
};

export const loadFail = err => {
  return dispatch => {
    dispatch({
      type: LOAD_FAIL,
      payload: err
    });
  };
};

const initialState = {
  loading: false,
  load_status: "not_loaded",
  loaded: false,
  typing: false,
  printError: false,
  data: [],
  cardsDistributed: false,
  cardStyles: [],
  distributorStyle: {}
};

export default (state = initialState, action = {}) => {
  //let newData = Array.from(state.data); //DONT MUTATE THE FUGGIN STATE
  switch (action.type) {
    case TYPING:
      return {
        ...state,
        typing: true,
        printError: false
      };
    case LOAD_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        printError: false,
        typing: false,
        cardsDistributed: false
      };
    case LOAD_END:
      return {
        ...state,
        loading: false,
        typing: false
      };
    case CARDS_DISTRIBUTED:
      return {
        ...state,
        cardsDistributed: true,
        cardStyles: action.payload.cardStyles,
        distributorStyle: action.payload.distributorStyle
      };
    case CARDS_REDISTRIBUTE:
      return {
        ...state,
        cardsDistributed: false
      };
    case LOAD_SUCCESS:
      action.payload.forEach(entry => {
        entry.img = "";
        entry.goers = [];
        entry.updated = false;
      });
      return {
        ...state,
        loading: false,
        load_status: "success",
        loaded: true,
        typing: false,
        printError: false,
        data: action.payload
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        typing: false,
        printError: true,
        load_status: action.payload
      };
    default:
      return state;
  }
};
