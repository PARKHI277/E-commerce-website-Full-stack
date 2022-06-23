const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getproductdetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productcontroller");

const { isAuthenticatedUser } = require("../middleware/auth");
router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

router.route("/admin/product/:id").get(getproductdetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);
module.exports = router;
