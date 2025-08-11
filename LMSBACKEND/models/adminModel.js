// src/models/adminModel.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminName: String,
  adminEmail: String,
  password: String,
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
