import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import userModel from "./../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, question } = req.body;

    // Validations

    if (!name) {
      return res.send({ message: "Name is Reqquired" });
    }
    if (!email) {
      return res.send({ message: "Email is Reqquired" });
    }
    if (!password) {
      return res.send({ message: "Password is Reqquired" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Reqquired" });
    }
    if (!address) {
      return res.send({ message: "Address is Reqquired" });
    }
    if (!question) {
      return res.send({ message: "Security Question is Reqquired" });
    }

    // Check existing User
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered, Please Login!",
      });
    }

    // Registering User
    const hashedPassword = await hashPassword(password);

    // Save User
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      question,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration.",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: true,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const testController = async (req, res) => {
  try {
    res.status(200).send("Protected Route");
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Unauthorised Token",
      error,
    });
  }
};

// FORGOT PASSWORD
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, question, password } = req.body;
    if (!email) res.status(400).send({ message: "Email is required" });
    if (!question)
      res.status(400).send({
        message: "Security Question should be answeres and can't be left empty",
      });
    if (!password)
      res.status(400).send({ message: `New Password can't be blank` });

    // check
    const user = await userModel.findOne({ email, question });
    console.log(user);
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Security Answer",
      });
    }

    const hashed = await hashPassword(password);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
