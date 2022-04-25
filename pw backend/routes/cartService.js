const { Router } = require("express");
const { getCart, addToCart } = require("../controllers/cartController");

const route = Router();

// get cart items
route.get("/cart", getCart);

// get cart item
route.post("/cart", addToCart);

module.exports.cartService = route;