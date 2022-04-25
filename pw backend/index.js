// libs
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// services
const { authService } = require("./routes/authService");
const { cartService } = require("./routes/cartService");
const { pollService } = require("./routes/pollService");
const { storeService } = require("./routes/storeService");

const app = express();


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// login handlers
app.use(authService);

// product review, rating and wishlist.
app.use(storeService);

// cart handlers and user place orders
app.use(cartService);

// polling system.
app.use(pollService);

app.use((error, req, res, next) => {
  if (error instanceof Error) {
    return res.send({ msg: error.message });
  }

  res.status(400).send({
    msg: "Something when wrong",
  });
});

app.listen(5000, async () => {
  console.log("server is listening to the port 5000.");
  try {
    const mongodb = await mongoose.connect(
      "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
    );
    if (mongodb) {
      console.log("connected to the mongodb");
    }
  } catch (error) {
    console.log("can not connect to the db.");
  }
});
