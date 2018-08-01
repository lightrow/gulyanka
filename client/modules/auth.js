const SAVE_AUTHDATA = "auth/SAVE_AUTHDATA";
const VERIFY = "auth/VERIFY";

export const logout = () => {
  return dispatch => {
    fetch("/api/logout").then(response => {
      if (response.status === 200) {
        dispatch({
          type: "LOGOUT"
        });
      }
    });
  };
};

export const saveAuthData = data => {
  return dispatch => {
    dispatch({
      type: SAVE_AUTHDATA,
      payload: { data }
    });
  };
};

export const verify = () => {
  return dispatch => {
    console.log("fetching for 'verify' in redux");
    fetch("/api/verify", {
      credentials: "include"
    })
      .then(response => response.json())
      .then(parsed => {
        if (parsed.status === 200) {
          console.log(parsed);
          dispatch({
            type: VERIFY,
            payload: { data: parsed.data, friends: parsed.friends }
          });
        }
      });
  };
};

const initialState = {
  friends: { users: [] },
  userinfo: { screen_name: "" },
  logged: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_AUTHDATA:
      return {
        ...state,
        authdata: action.payload.data
      };
    case VERIFY:
      return {
        ...state,
        userinfo: action.payload.data,
        friends: action.payload.friends,
        logged: true
      };
    default:
      return state;
  }
};
