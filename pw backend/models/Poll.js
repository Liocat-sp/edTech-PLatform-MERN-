const mongoose = require("mongoose");
const { mongooseParser } = require("../utils/MongooseParser");

const Schema = mongoose.Schema;

mongooseParser.timeStamps = true;

/**
 * response types
 */
const PollResponse = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  option: {
    type: Number,
    required: true,
  },
});

/**
 * options options
 */
const PollOption = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
});

/**
 * Poll
 */
const Poll = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: { type: [PollOption] },
    response: { type: [PollResponse] },
  },
  { timestamps: true, ...mongooseParser }
);

module.exports.Poll = mongoose.model("Poll", Poll);
