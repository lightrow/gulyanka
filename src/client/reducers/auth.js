const SAVE_AUTH = 'input/SAVE_AUTH';

export const saveAuth = (authData) => {
  return dispatch => {
    dispatch({
      type: SAVE_AUTH,
      payload: authData
    });
  };
};

const initialState = {
  authData: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_AUTH:
      return {
        ...state,
        authData: action.payload,
      };
    default:
      return state;
  }
};
