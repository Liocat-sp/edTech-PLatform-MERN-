import { api } from "../Api";
import { store } from "../reducers/store";
import { getHeaders } from "./common";

const { getState } = store;

export const addToCart = async (product) => {
  const { user } = getState().userReducer;

  const data = {
    userId: user.id,
    product,
  };

  try {
    const response = await api.post("/cart", data, { headers: getHeaders() });
    return response.data?.cart?.products;
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async () => {
  console.log(getState());
  const { user } = getState().userReducer;
  const options = {
    headers: getHeaders(),
  };
  options.params = {
    userId: user.id,
  };

  try {
    const response = await api.get("/cart", options);
    return response.data?.cart.products;
  } catch (error) {
    console.log(error);
  }
};
