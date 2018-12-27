const CHANGE_COLOR = "navbar/CHANGE_COLOR";

export const changeColor = color => {
  return dispatch => {
    dispatch({
      type: CHANGE_COLOR,
      payload: color
    }); 
  };
};

const initialState = {
  color: "white"
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_COLOR:
      return { 
        ...state,
        color: action.payload
      };
    default:
      return state;
  }
};
