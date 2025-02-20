import slugify from "slugify";
import productModel from "../models/productModel.js";

// create product
export const createProductController = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price || !description)
      return res.status(401).send({ message: "All fields are required" });

    // existing product
    const existingProduct = await productModel.findOne({ name });
    if (existingProduct) {
      return res.status(200).send({
        success: true,
        message: "Product already exists",
      });
    }
    const product = await new productModel({
      name,
      price,
      description,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Product",
    });
  }
};

// update product
export const updateProductController = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const { id } = req.params;
    const product = await productModel.findByIdAndUpdate(
      id,
      { name, price, description, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating product",
    });
  }
};

// Get All Products
export const productController = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).send({
      success: true,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting products",
    });
  }
};

export const singleProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    res.status(200).send({
      success: true,
      message: "Product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single product",
    });
  }
};

// Delete Product
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting product",
    });
  }
};
