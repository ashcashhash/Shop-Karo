import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

// create category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      return res.status(401).send({ message: "Cateegory Name is required" });

    // existing category
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

// update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { slug } = req.params;
    const ctg = await categoryModel.findOne({ slug });
    console.log(ctg);
    const category = await categoryModel.findByIdAndUpdate(
      ctg._id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while udpating category",
    });
  }
};

// Get All Categories

export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting categories",
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    res.status(200).send({
      success: true,
      message: "Category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};

// Delete Category
export const deleteCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    console.log(category);

    await categoryModel.findByIdAndDelete(category._id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting category",
    });
  }
};
