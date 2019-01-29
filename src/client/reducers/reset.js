const RESET = "RESET";

export default (state = {}, action = {}) => {
  switch (action.type) {
    case RESET:
      let newState = {}
      return newState
    default:
      return state;
  }
};
