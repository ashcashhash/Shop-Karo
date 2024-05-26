import express from "express";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update category
router.put(
  "/update-category/:slug",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// get all category
router.get("/get-category", categoryController);

// get single category
router.get("/get-single-category/:slug", singleCategoryController);

// delete category
router.delete(
  "/delete-category/:slug",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
