import { USER_LOGIN } from "../constants";

const initState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("auth-token"),
};

export const userReducer = (state = initState, action) => {
  const { type, data } = action;

  switch (type) {
    case USER_LOGIN:
      return handleLogin(state, data);
    default:
      return state;
  }
};

function handleLogin(state, data) {
  const { user, token } = data;
  return {
    ...state,
    user: user,
    token: token,
  };
}
