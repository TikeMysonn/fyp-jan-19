const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certType: String,
  courseName: String,
  grade: String,
  studentName: String,
  studentId: { type: String, unique: true },
  issueYear: Number,
});

module.exports = mongoose.model("Certificate", certificateSchema);
