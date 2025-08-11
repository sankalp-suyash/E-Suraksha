// src/routes/adminRoutes.js
const express = require("express");
const Admin = require("../models/adminModel");

const router = express.Router();

// Create a new admin
router.post("/", async (req, res) => {
  try {
    const { adminName, adminEmail, password } = req.body;
    const newAdmin = new Admin({ adminName, adminEmail, password });
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
