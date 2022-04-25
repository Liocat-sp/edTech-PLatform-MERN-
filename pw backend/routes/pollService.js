const { Router } = require("express");
const {
  getPolls,
  getPollDetails,
  createPoll,
  submitAns,
} = require("../controllers/pollController");

const route = Router();

// get polls
route.get("/poll", getPolls);

// get poll
route.get("/poll/details", getPollDetails);

// create poll
route.post("/poll", createPoll);

// update the poll
route.post("/poll/resp", submitAns);;



module.exports.pollService = route;
