const { Cart } = require("../models/Cart");
const { Product } = require("../models/Product");

// add to cart logic here
module.exports.addToCart = async (req, res) => {
  const { userId, product } = req.body;

  const isPresent = await Product.findOne({ _id: product });
  if (!isPresent) {
    return next(new Error("Invalid product id."));
  }

  let cart = await Cart.findOne({ userId: userId });
  if (!cart) {
    cart = new Cart({ userId, products: [] });
  }

  try {
    const alreadyPresnt = cart.products.find(
      (item) => item._id == isPresent.id
    );

    if (!alreadyPresnt) {
      cart.products.push(isPresent);
    }

    await cart.save();

    return res.send({ cart: cart });
  } catch (error) {
    console.log(error);
    next(new Error("Something went wrong."));
  }
};

/**
 * get the user cart details.
 * @param {*} req request
 * @param {*} res response
 */
module.exports.getCart = async (req, res) => {
  const { userId } = req.query;

  let cart = await Cart.findOne({ userId: userId }).populate("products");

  if (!cart) {
    cart = { userId: userId, products: [] };
  }
  try {
    return res.send({ cart: cart });
  } catch (error) {
    console.log(error);
    next(new Error("Something went wrong."));
  }
};
