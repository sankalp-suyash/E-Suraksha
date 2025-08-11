// models/lectureModel.js
const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  classLink: String,
  endTime: Date,
  instructorName: String,
  lectureName: String,
  lectureTitle: String,
  startTime: Date,
  discussion: [String],
});

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
