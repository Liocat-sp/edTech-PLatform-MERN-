const { Poll } = require("../models/Poll");

/**
 * calculate result for each options by id
 * @param {*} poll
 * @returns new poll object with the result
 */
const getResults = (poll) => {
  if (!poll.response) return poll;

  poll = poll.toJSON();

  let count = poll.response.length;
  const resultByOptions = {};

  poll.options.map((item) => (resultByOptions[item.id] = 0));

  poll.response.map((item) => {
    resultByOptions[item.option]++;
  });

  Object.keys(resultByOptions).map((item) => {
    resultByOptions[item] = (resultByOptions[item] / count) * 100;
  });

  return {
    ...poll,
    result: resultByOptions,
  };
};

/**
 * get the list of the polls
 * @param {*} req
 * @param {*} res
 */
module.exports.getPolls = async (req, res) => {
  const { userId } = req.query;
  try {
    let polls = await Poll.find();

    polls = polls.map((poll) => {
      const isUserPresent = poll.response.find(
        (item) => item.userId.toString() === userId
      );
      const result = getResults(poll);
      return { ...result, awaitingUserResp: !isUserPresent };
    });

    res.send({ polls });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * create poll
 * @param {*} req
 * @param {*} res
 */
module.exports.createPoll = async (req, res, next) => {
  const { question, options } = req.body;

  const data = {
    question: question,
    options: options,
  };

  try {
    const poll = new Poll(data);
    await poll.save();

    res.send({ poll });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Submit the poll answer by user
 * @param {*} req
 * @param {*} res
 */
module.exports.submitAns = async (req, res, next) => {
  const { id, userId, option } = req.body;

  try {
    const poll = await Poll.findById({ _id: id });
    if (!poll) {
      return next(new Error("Could not find the poll details."));
    }

    if (!poll.response) {
      poll.response = [];
    }

    const data = {
      userId,
      option,
    };

    poll.response.push(data);
    poll.save();

    const withtResult = getResults(poll);
    withtResult.awaitingUserResp = false;

    res.send({ poll: withtResult });
  } catch (error) {
    next(new Error("can not register poll response."));
  }
};

/**
 * get details of the single poll
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports.getPollDetails = async (req, res, next) => {
  const { id } = req.query;

  try {
    const poll = await Poll.findById({ _id: id });
    if (!poll) {
      return next(new Error("Could not find the poll details."));
    }

    const isUserPresent = poll.response.find((item) => item.userId === userId);

    poll = JSON.stringify(poll);

    const withtResult = getResults(poll);
    withtResult.awaitingUserResp = !isUserPresent;

    res.send({ poll: withtResult });
  } catch (error) {
    next(new Error("can not find the poll details."));
  }
};
