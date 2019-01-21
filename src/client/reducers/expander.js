const EXPAND_CARD = "expander/EXPAND_CARD";
const CLOSE_CARD = "expander/CLOSE_CARD";
const EXPAND_PARTICIPANTS = "expander/EXPAND_PARTICIPANTS";
const CLOSE_PARTICIPANTS = "expander/CLOSE_PARTICIPANTS";

export const expandCardReducer = () => {
  return dispatch => {
    dispatch({
      type: EXPAND_CARD
    });
  };
};

export const closeCardReducer = () => {
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
  expanded: false,
  participantsExpanded: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case EXPAND_CARD:
      return {
        ...state,
        expanded: true
      };
    case CLOSE_CARD:
      return {
        ...state,
        expanded: false
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
