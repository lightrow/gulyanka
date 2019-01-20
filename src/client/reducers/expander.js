const EXPAND_CARD = "input/EXPAND_CARD";
const CLOSE_CARD = "input/CLOSE_CARD";

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

const initialState = {
  expanded: false
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
    default:
      return state;
  }
};
