// const mongoose = require("mongoose");

// const certificateSchema = new mongoose.Schema({
//   certType: String,
//   courseName: String,
//   grade: String,
//   uniName: String,
//   studentName: String,
//   studentId: { type: String, unique: true },
//   issueYear: Number,
// });

// module.exports = mongoose.model("Certificate", certificateSchema);

const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certType: { type: String, minlength: 1, maxlength: 255 },
  courseName: { type: String, minlength: 1, maxlength: 255 },
  grade: { type: String, minlength: 1, maxlength: 255 },
  uniName: { type: String, minlength: 1, maxlength: 255 },
  studentName: { type: String, minlength: 1, maxlength: 255 },
  studentId: { type: String, unique: true },
  issueYear: { type: String, minlength: 1, maxlength: 255 },
});

module.exports = mongoose.model("Certificate", certificateSchema);
