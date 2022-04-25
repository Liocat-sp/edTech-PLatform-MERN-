const mongoose = require("mongoose");
const { mongooseParser } = require("../utils/MongooseParser");

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  mongooseParser
);

module.exports.Product = mongoose.model("Product", Product);
