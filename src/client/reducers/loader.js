const LOAD_START = "loader/LOAD_START";
const LOAD_END = "loader/LOAD_END";
const LOAD_SUCCESS = "loader/LOAD_SUCCESS";
const LOAD_FAIL = "loader/LOAD_FAIL";
const TYPING = "loader/TYPING";
const SAVE_IMG = "loader/SAVE_IMG";
export const typingStart = () => {
  return dispatch => {
    dispatch({
      type: TYPING
    });
  };
};

export const saveImg = obj => {
  return dispatch => {
    dispatch({
      type: SAVE_IMG,
      payload: obj,
    });
  };
};

export const loadStart = () => {
  return dispatch => {
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
  data: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case TYPING:
      return {
        ...state,
        typing: true,
        printError: false
      };
    case SAVE_IMG:
      let newData = state.data;
      console.log(action.payload.key);
      newData[action.payload.key].img = action.payload.img;
      return {
        ...state,
        data: newData
      };
    case LOAD_START:
      return {
        ...state,
        loading: true,
        loaded: false,
        printError: false,
        typing: false
      };
    case LOAD_END:
      return {
        ...state,
        loading: false,
        typing: false
      };
    case LOAD_SUCCESS:
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
