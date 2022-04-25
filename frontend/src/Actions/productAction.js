import { api } from "../Api";
import { getHeaders } from "./common";

export const getProducts = async () => {
  const options = {
    headers: getHeaders(),
  };

  try {
    const response = await api.get("/product", options);
    return response.data?.products;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProduct = async (id) => {
  const options = {
    headers: getHeaders(),
  };

  options.params = {
    id: id,
  };

  try {
    const response = await api.get("/product/details", options);
    return response.data?.product;
  } catch (error) {
    console.log(error);
  }
};
