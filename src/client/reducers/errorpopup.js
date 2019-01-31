const CLOSE_ERROR_POPUP = "errorpopup/CLOSE_ERROR_POPUP";
const HIDE_ERROR_POPUP = "errorpopup/HIDE_ERROR_POPUP";
const SHOW_ERROR_POPUP = "errorpopup/SHOW_ERROR_POPUP";

export const hideErrorPopup = () => {
  return {
    type: HIDE_ERROR_POPUP
  };
};

export const closeErrorPopup = () => {
  console.log("IM CLOSE ERROR POPUP")
  return dispatch => {
    dispatch({
      type: CLOSE_ERROR_POPUP
    });
    setTimeout(() => {
      dispatch(hideErrorPopup());
    }, 1000);
  };
};

export const showErrorPopup = errorType => {
  console.log("SHOWING ERORPOPUP")
  return dispatch => {
    dispatch({
      type: SHOW_ERROR_POPUP,
      payload: errorType
    });
    setTimeout(() => {
      console.log("DISPATCHING CLOSE ERROR POPUP")
      dispatch(closeErrorPopup());
    }, 3000);
  };
};

const initialState = {
  errorType: "",
  errorShow: false,
  errorHidden: true
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLOSE_ERROR_POPUP:
      return {
        ...state,
        errorShow: false
      };
    case HIDE_ERROR_POPUP:
      return {
        ...state,
        errorHidden: true
      };
    case SHOW_ERROR_POPUP:
      return {
        ...state,
        errorType: action.payload,
        errorShow: true,
        errorHidden: false
      };
    default:
      return state;
  }
};
