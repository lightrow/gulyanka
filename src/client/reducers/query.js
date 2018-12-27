const SAVE_LOCATION = "query/SAVE_LOCATION";

export const saveLocation = location => {
  return dispatch => {
    dispatch({
      type: SAVE_LOCATION,
      payload: location
    });
  };
};

const initialState = {
  location: ""
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
   
    default:
      return state;
  }
};
