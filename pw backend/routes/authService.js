const { Router } = require("express");
const { loginUser, signupUser } = require("../controllers/authController");

const route = Router();

// login
route.get("/user", loginUser);

// sign up
route.post("/user", signupUser);

module.exports.authService = route;
