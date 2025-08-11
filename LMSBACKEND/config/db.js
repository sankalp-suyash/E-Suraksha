// src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://riteshbiswas:riteshbiswas@generaluse.sshpglb.mongodb.net/<dbname>?retryWrites=true&w=majority");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
