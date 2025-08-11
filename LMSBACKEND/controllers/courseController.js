// src/controllers/courseController.js
const Course = require("../models/courseModel");

const createCourse = async (req, res) => {
  try {
    const { name, imageLink, description, docsLink } = req.body;
    const newCourse = new Course({ name, imageLink, description, docsLink });
    await newCourse.save();
    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageLink, description, docsLink } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { name, imageLink, description, docsLink },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createCourse, getAllCourses, deleteCourse, updateCourse };
