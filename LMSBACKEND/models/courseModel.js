// src/models/courseModel.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  imageLink: String,
  description: String,
  docsLink: String,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
