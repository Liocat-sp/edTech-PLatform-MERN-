const { Product } = require("../models/Product");

/**
 * create product
 * @param {*} req request
 * @param {*} res response
 * @param {*} next
 */
module.exports.createProduct = async (req, res, next) => {
  const { title, image, description, price, rating } = req.body;

  const data = {
    title,
    image,
    description,
    price: parseInt(price),
    rating: parseInt(rating),
  };
  try {
    const product = await Product.create(data);
    await product.save();
    res.send({ product });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * get list of products
 * @param {*} req request
 * @param {*} res response
 * @param {*} next
 */
module.exports.getProductList = async (req, res, next) => {
  const products = await Product.find({});
  if (!products) {
    return next(new Error("Could not find the list of products."));
  }
  res.send({ products: products });
};

/**
 * get details of single product with id
 * @param {*} req request
 * @param {*} res response
 * @param {*} next
 */
module.exports.getProductDetails = async (req, res, next) => {
  const { id } = req.query;

  try {
    const product = await Product.findById({ _id: id });
    if (!product) {
      return next(new Error("Could not find the product details."));
    }
    res.send({ product });
  } catch (error) {
    next(new Error("can not find the product details."));
  }
};
