// src/app.js
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lectureRoutes = require("./routes/lectureRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors"); // Import the cors middleware
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors()); // Use the cors middleware to allow all origins

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/admins", adminRoutes);
module.exports = app;
