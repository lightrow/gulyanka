const INPUT_CHANGE = "input/INPUT_CHANGE";

export const inputChange = inputValue => {
  return dispatch => {
    dispatch({
      type: INPUT_CHANGE,
      payload: inputValue
    });
  };
};

const initialState = {
  search_field: ""
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        search_field: action.payload
      };
    default:
      return state;
  }
};
