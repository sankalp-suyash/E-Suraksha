// src/routes/courseRoutes.js
const express = require("express");
const {
  createCourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.post("/courses", createCourse);
router.get("/courses", getAllCourses);
router.delete("/:id", deleteCourse);
router.put("/courses/:id", updateCourse);
module.exports = router;
