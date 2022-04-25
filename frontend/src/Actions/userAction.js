import { api } from "../Api";
import { USER_LOGIN } from "../constants";
import { store } from "../reducers/store";

const { dispatch } = store;

export const userLogin = async (phoneNumber, password) => {
  const headers = {};
  headers.params = {};
  headers.params.phoneNumber = phoneNumber;
  headers.params.password = password;

  try {
    const response = await api.get("/user", headers);

    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("auth-token", response.data.token);
    dispatch({ type: USER_LOGIN, data: { ...response.data } });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const userSignup = async (name, phoneNumber, password, email) => {
  try {
    const data = {
      name: name,
      phoneNumber: phoneNumber,
      password: password,
      email: email,
    };
    const response = await api.post("/user", data, {});

    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("auth-token", response.data.token);
    dispatch({ type: USER_LOGIN, data: { ...response.data } });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const logOut = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("auth-token");
  window.location = "/";
};
