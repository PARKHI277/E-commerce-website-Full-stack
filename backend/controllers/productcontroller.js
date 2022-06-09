const { resetWatchers } = require("nodemon/lib/monitor/watch");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErros = require("../middleware/catchAsyncErrors");
// create product -- admin
exports.createProduct = catchAsyncErros(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// get all products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
};

// update product -- admin

exports.updateProduct = catchAsyncErros(async (req, res, next) => {
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
});
// product details

exports.getproductdetails = catchAsyncErros(async (req, res, next) => {
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
  });
});
// delete product -- admin

exports.deleteProduct = catchAsyncErros(async (req, res, next) => {
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
});
