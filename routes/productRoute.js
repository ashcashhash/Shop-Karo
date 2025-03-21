import express from "express";
import {
  productController,
  createProductController,
  deleteProductController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
// create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  createProductController
);

// update product
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  updateProductController
);

// get all products
router.get("/get-products", productController);

// get single product
router.get("/get-single-product/:id", singleProductController);

// delete product
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

export default router;
