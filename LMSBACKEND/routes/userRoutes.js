// src/routes/userRoutes.js
const express = require("express");
const {
  registerUser,
  getAllUsers,
  deleteUserById,
  updateUserProfile,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/users", getAllUsers);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUserProfile);
module.exports = router;


