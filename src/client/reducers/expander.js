const OPEN_CARD = "expander/OPEN_CARD";
const CLOSE_CARD = "expander/CLOSE_CARD";
const EXPAND_PARTICIPANTS = "expander/EXPAND_PARTICIPANTS";
const CLOSE_PARTICIPANTS = "expander/CLOSE_PARTICIPANTS";


export const openCard = cardIndex => {
  return dispatch => {
    dispatch({
      type: OPEN_CARD,
      payload: cardIndex
    });
  };
};

export const closeCard = () => {
  return dispatch => {
    dispatch({
      type: CLOSE_CARD
    });
  };
};

export const expandParticipants = () => {
  return dispatch => {
    dispatch({
      type: EXPAND_PARTICIPANTS
    });
  };
};

export const closeParticipants = () => {
  return dispatch => {
    dispatch({
      type: CLOSE_PARTICIPANTS
    });
  };
};

const initialState = {
  participantsExpanded: false,
  loadedCard: {},
  isOpened:false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN_CARD:
      return {
        ...state,
        loadedCard: action.payload,
        isOpened:true
      };
    case CLOSE_CARD:
      return {
        ...state,
        isOpened: false,
        loadedCard:{}
      };
    case CLOSE_PARTICIPANTS:
      return {
        ...state,
        participantsExpanded: false
      };
    case EXPAND_PARTICIPANTS:
      return {
        ...state,
        participantsExpanded: true
      };
    default:
      return state;
  }
};
