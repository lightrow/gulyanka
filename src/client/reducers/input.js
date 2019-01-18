const INPUT_CHANGE = "input/INPUT_CHANGE";
const RESET_TYPING = "input/RESET_TYPING";

export const inputChange = inputValue => {
  return dispatch => {
    dispatch({
      type: INPUT_CHANGE,
      payload: inputValue
    });
  };
};

export const resetTyping = () => {
  return dispatch => {
    dispatch({
      type: RESET_TYPING,
    });
  };
};

const initialState = {
  search_field: "",
  typing: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        search_field: action.payload,
        typing:true
      };
    case RESET_TYPING:
    return {
      ...state,
      typing:false
    };
    default:
      return state;
  }
};
