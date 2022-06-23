const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErros = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// create product -- admin
exports.createProduct = async (req, res, next) => {
  try {
    // req.body.user = req.user._id;
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      sucess: false,
    });
  }
};

// get all products
exports.getAllProducts = async (req, res) => {
  const resultPerPage = 5;
  // const productCount = await Product.countDocumnets();
  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apifeature.query;
  res.status(200).json({ success: true, products });
};

// update product -- admin

exports.updateProduct = async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      sucess: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};
// product details

exports.getproductdetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    // return res.status(500).json({
    //   sucess: false,
    //   message: "Product Not found",
    // });
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    sucess: true,
    product,
    productCount,
  });
};
// delete product -- admin

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      sucess: false,
      message: "Product Not found",
    });
  }
  await product.remove();

  res.status(200).json({
    sucess: true,
    message: "Product delete successfully",
  });
};

// Create New Review or Update the review
exports.createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};

// Get All Reviews of a product
exports.getProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

// Delete Review
exports.deleteReview = async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
};
