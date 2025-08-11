// src/controllers/userController.js
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, courses } = req.body;
    console.log("Received courses:", courses); // Add this line to check the courses data
    const newUser = new User({ name, email, password, courses });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  registerUser,
  getAllUsers,
  deleteUserById,
  updateUserProfile,
};
