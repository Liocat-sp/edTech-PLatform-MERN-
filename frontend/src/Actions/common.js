import { store } from "../reducers/store";

const { getState } = store;

export const getHeaders = () => {
  const { token } = getState().userReducer;

  return {
    Authorization: `Brearer ${token}`,
  };
};
