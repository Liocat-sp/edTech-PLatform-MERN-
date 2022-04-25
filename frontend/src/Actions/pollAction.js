import { api } from "../Api";
import { store } from "../reducers/store";
import { getHeaders } from "./common";

const { getState } = store;

export const getPolls = async () => {
  const { user } = getState().userReducer;
  const options = {
    headers: getHeaders(),
    params: {
      userId: user.id,
    },
  };

  try {
    const response = await api.get("/poll", options);
    return response.data?.polls;
  } catch (error) {
    console.log(error);
  }
};

export const createPoll = async (question, options) => {
  const data = {
    question: question,
    options: options,
  };

  try {
    const response = await api.post("/poll", data, { headers: getHeaders() });
    return response.data?.poll;
  } catch (error) {
    console.log(error);
  }
};

export const addResponse = async (id, option) => {
  const { user } = getState().userReducer;
  const data = {
    userId: user.id,
    id: id,
    option: option,
  };

  try {
    const response = await api.post("/poll/resp", data, {
      headers: getHeaders(),
    });
    return response.data?.poll;
  } catch (error) {
    console.log(error);
  }
};
