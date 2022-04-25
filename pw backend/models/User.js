const mongoose = require("mongoose");
const { mongooseParser } = require("../utils/MongooseParser");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  mongooseParser
);

module.exports.User = mongoose.model("User", User);
