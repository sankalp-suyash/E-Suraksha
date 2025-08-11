// src/routes/lectureRoutes.js
const express = require("express");
const Lecture = require("../models/lectureModel");

const router = express.Router();

// Get all lectures
router.get("/", async (req, res) => {
  try {
    const lectures = await Lecture.find();
    res.json(lectures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new lecture
router.post("/", async (req, res) => {
  try {
    const newLecture = new Lecture(req.body);
    await newLecture.save();
    res.status(201).json({ message: "Lecture created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a lecture by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Lecture.findByIdAndDelete(id);
    res.status(200).json({ message: "Lecture deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
