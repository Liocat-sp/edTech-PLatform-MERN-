const { User } = require("../models/User");
const { scrypt, randomBytes } = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const scryptAsync = promisify(scrypt);

/**
 * get the jwt token for the user
 * @param {User} user
 */
function getToken(user) {
  return jwt.sign(
    {
      phoneNumber: user.phoneNumber,
      id: user.id,
    },
    process.env.SECURE_KEY
  );
}

/**
 * login user handler
 * @param {*} req request
 * @param {*} res response
 */
module.exports.loginUser = async (req, res, next) => {
  const { phoneNumber, password } = req.query;
  console.log(phoneNumber);

  const user = await User.findOne({ phoneNumber: phoneNumber });

  if (!user) {
    throw new Error("Error user not found.");
  }

  const [hash, salt] = user.password.split(".");
  const buff = await scryptAsync(password, salt, 64);
  const checkpass = `${buff.toString("hex")}.${salt}`;

  if (user.password !== checkpass) {
    return next(new Error("incorrent user details."));
  }

  const token = getToken(user);

  return res.status(200).send({ user: user, token: token });
};

/**
 * Sign up handler for the sign up user handler
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next method
 */
module.exports.signupUser = async (req, res, next) => {
  const { name, phoneNumber, password, email } = req.body;

  const isPresent = await User.findOne({ phoneNumber });
  if (isPresent) {
    return next(new Error("User already present"));
  }

  // create randomebyte
  const salt = randomBytes(8).toString("hex");
  // mix both password with has of 64.
  const buff = await scryptAsync(password, salt, 64);
  const newPass = `${buff.toString("hex")}.${salt}`;

  const data = {
    name: name,
    phoneNumber: parseInt(phoneNumber),
    password: newPass,
    email: email,
  };

  try {
    const user = new User(data);
    await user.save();
    const token = getToken(user);

    return res.send({ user: user, token: token });
  } catch (error) {
    console.log(error);
    next(new Error("Something went wrong."));
  }
};
