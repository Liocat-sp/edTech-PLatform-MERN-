const { Router } = require("express");
const {
  getProductDetails,
  getProductList,
  createProduct,
} = require("../controllers/storeController");

const route = Router();

// product list
route.get("/product", getProductList);

// product details deep
route.get("/product/details", getProductDetails);

// product
route.post("/product", createProduct);

module.exports.storeService = route;
