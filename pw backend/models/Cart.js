const mongoose = require("mongoose");
const { mongooseParser } = require("../utils/MongooseParser");

const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  mongooseParser
);

module.exports.Cart = mongoose.model("Cart", Cart);
